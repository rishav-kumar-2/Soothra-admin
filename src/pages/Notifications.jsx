import { useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import Badge from '../components/ui/Badge'
import Modal from '../components/ui/Modal'
import { mockNotifications } from '../data/mockData'

export default function Notifications() {
  const [notifications, setNotifications] = useState(mockNotifications)
  const [selected, setSelected] = useState(null)
  const [composeOpen, setComposeOpen] = useState(false)
  const [form, setForm] = useState({ title: '', type: 'Email', trigger: '', body: '' })
  const [compose, setCompose] = useState({ subject: '', recipients: '', message: '' })

  const toggleStatus = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, status: n.status === 'Active' ? 'Inactive' : 'Active' } : n
      )
    )
  }

  const openEdit = (notif) => {
    setForm({
      title: notif.title,
      type: notif.type,
      trigger: notif.trigger,
      body: `Dear {{patient_name}},\n\nThis is regarding your ${notif.title.toLowerCase()}.\n\nRegards,\nSOOTHRA Team`,
    })
    setSelected(notif)
  }

  const saveTemplate = () => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === selected.id
          ? { ...n, title: form.title, type: form.type, trigger: form.trigger }
          : n
      )
    )
    setSelected(null)
  }

  const sendCompose = () => {
    alert(`Email sent to: ${compose.recipients}\nSubject: ${compose.subject}`)
    setComposeOpen(false)
    setCompose({ subject: '', recipients: '', message: '' })
  }

  return (
    <div>
      <PageHeader
        title="Notifications & Email"
        subtitle="Manage automated notifications and send emails"
        actions={
          <button className="btn btn-primary" onClick={() => setComposeOpen(true)}>
            Compose Email
          </button>
        }
      />

      <div className="notif-grid">
        {notifications.map((n) => (
          <div key={n.id} className="notif-card">
            <div className="notif-card-header">
              <Badge status={n.type}>{n.type}</Badge>
              <Badge status={n.status}>{n.status}</Badge>
            </div>
            <h4>{n.title}</h4>
            <p className="text-muted">Trigger: {n.trigger}</p>
            <p className="text-muted">Last sent: {n.lastSent}</p>
            <div className="notif-actions">
              <button className="btn btn-sm btn-outline" onClick={() => openEdit(n)}>Edit Template</button>
              <button className="btn btn-sm btn-ghost" onClick={() => toggleStatus(n.id)}>
                {n.status === 'Active' ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Edit Notification Template" wide>
        {selected && (
          <div className="modal-form">
            <div className="form-row">
              <div className="form-group">
                <label>Title</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Type</label>
                <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                  <option value="Email">Email</option>
                  <option value="SMS">SMS</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Trigger</label>
              <input value={form.trigger} onChange={(e) => setForm({ ...form, trigger: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Template Body</label>
              <textarea rows={8} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
              <span className="form-hint">Use {'{{patient_name}}'}, {'{{appointment_date}}'}, {'{{doctor_name}}'} as placeholders</span>
            </div>
            <div className="modal-actions">
              <button className="btn btn-ghost" onClick={() => setSelected(null)}>Cancel</button>
              <button className="btn btn-primary" onClick={saveTemplate}>Save Template</button>
            </div>
          </div>
        )}
      </Modal>

      <Modal open={composeOpen} onClose={() => setComposeOpen(false)} title="Compose Email" wide>
        <div className="modal-form">
          <div className="form-group">
            <label>Recipients</label>
            <input
              value={compose.recipients}
              onChange={(e) => setCompose({ ...compose, recipients: e.target.value })}
              placeholder="email@example.com, or select from enquiries..."
            />
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input
              value={compose.subject}
              onChange={(e) => setCompose({ ...compose, subject: e.target.value })}
              placeholder="Email subject"
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              rows={8}
              value={compose.message}
              onChange={(e) => setCompose({ ...compose, message: e.target.value })}
              placeholder="Write your message..."
            />
          </div>
          <div className="modal-actions">
            <button className="btn btn-ghost" onClick={() => setComposeOpen(false)}>Cancel</button>
            <button className="btn btn-primary" onClick={sendCompose}>Send Email</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
