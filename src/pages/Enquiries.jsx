import { useState, useMemo } from 'react'
import PageHeader from '../components/ui/PageHeader'
import Badge from '../components/ui/Badge'
import Modal from '../components/ui/Modal'
import { mockEnquiries, ENQUIRY_STATUSES } from '../data/mockData'
import { exportToCSV, formatDate } from '../utils/helpers'

export default function Enquiries() {
  const [enquiries, setEnquiries] = useState(mockEnquiries)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sourceFilter, setSourceFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  const [editStatus, setEditStatus] = useState('')
  const [editRemarks, setEditRemarks] = useState('')

  const sources = ['All', ...new Set(mockEnquiries.map((e) => e.source))]

  const filtered = useMemo(() => {
    return enquiries.filter((e) => {
      const matchSearch =
        !search ||
        e.name.toLowerCase().includes(search.toLowerCase()) ||
        e.email.toLowerCase().includes(search.toLowerCase()) ||
        e.id.toLowerCase().includes(search.toLowerCase())
      const matchStatus = statusFilter === 'All' || e.status === statusFilter
      const matchSource = sourceFilter === 'All' || e.source === sourceFilter
      return matchSearch && matchStatus && matchSource
    })
  }, [enquiries, search, statusFilter, sourceFilter])

  const openEdit = (enquiry) => {
    setSelected(enquiry)
    setEditStatus(enquiry.status)
    setEditRemarks(enquiry.remarks)
  }

  const saveChanges = () => {
    setEnquiries((prev) =>
      prev.map((e) =>
        e.id === selected.id ? { ...e, status: editStatus, remarks: editRemarks } : e
      )
    )
    setSelected(null)
  }

  const handleExport = () => {
    exportToCSV(filtered, `enquiries-${new Date().toISOString().slice(0, 10)}.csv`)
  }

  return (
    <div>
      <PageHeader
        title="Enquiries"
        subtitle={`${filtered.length} enquiry records`}
        actions={
          <button className="btn btn-primary" onClick={handleExport}>
            Export CSV
          </button>
        }
      />

      <div className="filters-bar">
        <input
          type="search"
          placeholder="Search by name, email, or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          {ENQUIRY_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <select value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)}>
          {sources.map((s) => (
            <option key={s} value={s}>{s === 'All' ? 'All Sources' : s}</option>
          ))}
        </select>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Contact</th>
              <th>Condition</th>
              <th>Source</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((e) => (
              <tr key={e.id}>
                <td className="mono">{e.id}</td>
                <td><strong>{e.name}</strong></td>
                <td>
                  <div className="cell-stack">
                    <span>{e.email}</span>
                    <span className="text-muted">{e.phone}</span>
                  </div>
                </td>
                <td>{e.condition}</td>
                <td>{e.source}</td>
                <td>{formatDate(e.date)}</td>
                <td><Badge status={e.status}>{e.status}</Badge></td>
                <td>
                  <button className="btn btn-sm btn-outline" onClick={() => openEdit(e)}>
                    Manage
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="empty-state">No enquiries match your filters</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title={`Enquiry ${selected?.id}`}>
        {selected && (
          <div className="modal-form">
            <div className="detail-grid">
              <div><label>Name</label><p>{selected.name}</p></div>
              <div><label>Email</label><p>{selected.email}</p></div>
              <div><label>Phone</label><p>{selected.phone}</p></div>
              <div><label>Condition</label><p>{selected.condition}</p></div>
            </div>

            <div className="form-group">
              <label>Status</label>
              <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                {ENQUIRY_STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Remarks</label>
              <textarea
                rows={4}
                value={editRemarks}
                onChange={(e) => setEditRemarks(e.target.value)}
                placeholder="Add internal remarks..."
              />
            </div>

            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setSelected(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveChanges}>Save Changes</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
