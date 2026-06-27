const variants = {
  new: 'badge-new',
  'in progress': 'badge-progress',
  contacted: 'badge-contacted',
  converted: 'badge-converted',
  closed: 'badge-closed',
  pending: 'badge-pending',
  approved: 'badge-approved',
  rescheduled: 'badge-rescheduled',
  completed: 'badge-completed',
  cancelled: 'badge-cancelled',
  active: 'badge-active',
  inactive: 'badge-inactive',
  email: 'badge-email',
  sms: 'badge-sms',
  admin: 'badge-admin',
  staff: 'badge-staff',
  doctor: 'badge-doctor',
  viewer: 'badge-viewer',
}

export default function Badge({ children, status }) {
  const key = String(status || children).toLowerCase()
  return <span className={`badge ${variants[key] || 'badge-default'}`}>{children}</span>
}
