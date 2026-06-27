import { useState, useMemo } from 'react'
import PageHeader from '../components/ui/PageHeader'
import Badge from '../components/ui/Badge'
import Modal from '../components/ui/Modal'
import { mockAppointments, APPOINTMENT_STATUSES } from '../data/mockData'
import { formatDate, getDaysInMonth, getFirstDayOfMonth } from '../utils/helpers'

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export default function Appointments() {
  const [appointments, setAppointments] = useState(mockAppointments)
  const [view, setView] = useState('list')
  const [statusFilter, setStatusFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [calMonth, setCalMonth] = useState(5)
  const [calYear, setCalYear] = useState(2026)
  const [selected, setSelected] = useState(null)
  const [editStatus, setEditStatus] = useState('')
  const [editNotes, setEditNotes] = useState('')
  const [editDate, setEditDate] = useState('')
  const [editTime, setEditTime] = useState('')

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      const matchSearch =
        !search ||
        a.patient.toLowerCase().includes(search.toLowerCase()) ||
        a.doctor.toLowerCase().includes(search.toLowerCase()) ||
        a.id.toLowerCase().includes(search.toLowerCase())
      const matchStatus = statusFilter === 'All' || a.status === statusFilter
      return matchSearch && matchStatus
    })
  }, [appointments, search, statusFilter])

  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(calYear, calMonth)
    const firstDay = getFirstDayOfMonth(calYear, calMonth)
    const cells = []
    for (let i = 0; i < firstDay; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) cells.push(d)
    return cells
  }, [calYear, calMonth])

  const getAppointmentsForDay = (day) => {
    if (!day) return []
    const dateStr = `${calYear}-${String(calMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return appointments.filter((a) => a.date === dateStr)
  }

  const openManage = (apt) => {
    setSelected(apt)
    setEditStatus(apt.status)
    setEditNotes(apt.notes)
    setEditDate(apt.date)
    setEditTime(apt.time)
  }

  const saveChanges = () => {
    setAppointments((prev) =>
      prev.map((a) =>
        a.id === selected.id
          ? { ...a, status: editStatus, notes: editNotes, date: editDate, time: editTime }
          : a
      )
    )
    setSelected(null)
  }

  const quickAction = (status) => {
    setEditStatus(status)
  }

  const prevMonth = () => {
    if (calMonth === 0) { setCalMonth(11); setCalYear((y) => y - 1) }
    else setCalMonth((m) => m - 1)
  }

  const nextMonth = () => {
    if (calMonth === 11) { setCalMonth(0); setCalYear((y) => y + 1) }
    else setCalMonth((m) => m + 1)
  }

  return (
    <div>
      <PageHeader
        title="Appointments"
        subtitle={`${filtered.length} appointments`}
        actions={
          <div className="view-toggle">
            <button className={`btn btn-sm ${view === 'list' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setView('list')}>
              List View
            </button>
            <button className={`btn btn-sm ${view === 'calendar' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setView('calendar')}>
              Calendar View
            </button>
          </div>
        }
      />

      <div className="filters-bar">
        <input
          type="search"
          placeholder="Search patient, doctor, or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Statuses</option>
          {APPOINTMENT_STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {view === 'list' ? (
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date & Time</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id}>
                  <td className="mono">{a.id}</td>
                  <td><strong>{a.patient}</strong></td>
                  <td>{a.doctor}</td>
                  <td>{formatDate(a.date)} · {a.time}</td>
                  <td>{a.type}</td>
                  <td><Badge status={a.status}>{a.status}</Badge></td>
                  <td>
                    <button className="btn btn-sm btn-outline" onClick={() => openManage(a)}>
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="card calendar-card">
          <div className="calendar-header">
            <button className="btn btn-sm btn-outline" onClick={prevMonth}>‹</button>
            <h3>{MONTHS[calMonth]} {calYear}</h3>
            <button className="btn btn-sm btn-outline" onClick={nextMonth}>›</button>
          </div>
          <div className="calendar-grid">
            {DAYS.map((d) => (
              <div key={d} className="cal-day-name">{d}</div>
            ))}
            {calendarDays.map((day, i) => {
              const dayApts = getAppointmentsForDay(day)
              return (
                <div key={i} className={`cal-cell ${day ? '' : 'empty'}`}>
                  {day && (
                    <>
                      <span className="cal-date">{day}</span>
                      {dayApts.map((a) => (
                        <button
                          key={a.id}
                          className={`cal-event status-${a.status.toLowerCase()}`}
                          onClick={() => openManage(a)}
                          title={`${a.patient} - ${a.time}`}
                        >
                          {a.time} {a.patient.split(' ')[0]}
                        </button>
                      ))}
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title={`Appointment ${selected?.id}`} wide>
        {selected && (
          <div className="modal-form">
            <div className="detail-grid">
              <div><label>Patient</label><p>{selected.patient}</p></div>
              <div><label>Doctor</label><p>{selected.doctor}</p></div>
              <div><label>Type</label><p>{selected.type}</p></div>
            </div>

            <div className="quick-actions">
              <button className="btn btn-sm btn-success" onClick={() => quickAction('Approved')}>Approve</button>
              <button className="btn btn-sm btn-warning" onClick={() => quickAction('Rescheduled')}>Reschedule</button>
              <button className="btn btn-sm btn-danger" onClick={() => quickAction('Cancelled')}>Cancel</button>
              <button className="btn btn-sm btn-primary" onClick={() => quickAction('Completed')}>Complete</button>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date</label>
                <input type="date" value={editDate} onChange={(e) => setEditDate(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Time</label>
                <input type="time" value={editTime} onChange={(e) => setEditTime(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                  {APPOINTMENT_STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Notes</label>
              <textarea
                rows={3}
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                placeholder="Add appointment notes..."
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
