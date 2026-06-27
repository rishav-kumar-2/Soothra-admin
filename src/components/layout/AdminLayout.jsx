import { useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

const titles = {
  '/': 'Dashboard',
  '/enquiries': 'Enquiry Management',
  '/appointments': 'Appointment Management',
  '/users': 'User & Role Management',
  '/notifications': 'Notification & Email Management',
  '/activity-logs': 'Activity Logs & Audit Trail',
}

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const title = titles[location.pathname] || 'Admin Panel'

  return (
    <div className="admin-layout">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      <div className="admin-main">
        <Header title={title} />
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
