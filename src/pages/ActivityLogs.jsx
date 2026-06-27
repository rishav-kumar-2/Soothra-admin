import { useState, useMemo } from 'react'
import PageHeader from '../components/ui/PageHeader'
import Badge from '../components/ui/Badge'
import { mockActivityLogs } from '../data/mockData'
import { exportToCSV } from '../utils/helpers'

const MODULES = ['All', 'Auth', 'Enquiries', 'Appointments', 'Users', 'Notifications']

export default function ActivityLogs() {
  const [search, setSearch] = useState('')
  const [moduleFilter, setModuleFilter] = useState('All')
  const [dateFilter, setDateFilter] = useState('')

  const filtered = useMemo(() => {
    return mockActivityLogs.filter((log) => {
      const matchSearch =
        !search ||
        log.user.toLowerCase().includes(search.toLowerCase()) ||
        log.action.toLowerCase().includes(search.toLowerCase())
      const matchModule = moduleFilter === 'All' || log.module === moduleFilter
      const matchDate = !dateFilter || log.timestamp.startsWith(dateFilter)
      return matchSearch && matchModule && matchDate
    })
  }, [search, moduleFilter, dateFilter])

  const handleExport = () => {
    exportToCSV(filtered, `activity-logs-${new Date().toISOString().slice(0, 10)}.csv`)
  }

  return (
    <div>
      <PageHeader
        title="Activity Logs"
        subtitle="Complete audit trail of admin actions"
        actions={
          <button className="btn btn-primary" onClick={handleExport}>Export Logs</button>
        }
      />

      <div className="filters-bar">
        <input
          type="search"
          placeholder="Search by user or action..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select value={moduleFilter} onChange={(e) => setModuleFilter(e.target.value)}>
          {MODULES.map((m) => (
            <option key={m} value={m}>{m === 'All' ? 'All Modules' : m}</option>
          ))}
        </select>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />
        {dateFilter && (
          <button className="btn btn-sm btn-ghost" onClick={() => setDateFilter('')}>Clear Date</button>
        )}
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User</th>
              <th>Action</th>
              <th>Module</th>
              <th>IP Address</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((log) => (
              <tr key={log.id}>
                <td className="mono">{log.timestamp}</td>
                <td><strong>{log.user}</strong></td>
                <td>{log.action}</td>
                <td><Badge>{log.module}</Badge></td>
                <td className="mono text-muted">{log.ip}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="empty-state">No activity logs match your filters</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
