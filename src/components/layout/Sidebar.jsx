import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { to: '/', label: 'Dashboard', icon: '◫' },
  { to: '/enquiries', label: 'Enquiries', icon: '✉' },
  { to: '/appointments', label: 'Appointments', icon: '◷' },
  { to: '/users', label: 'Users & Roles', icon: '◎' },
  { to: '/notifications', label: 'Notifications', icon: '◈' },
  { to: '/activity-logs', label: 'Activity Logs', icon: '≡' },
]

export default function Sidebar({ collapsed, onToggle }) {
  const { user, logout } = useAuth()

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-brand">
        <span className="brand-mark">S</span>
        {!collapsed && <span className="brand-text">SOOTHRA Admin</span>}
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            title={item.label}
          >
            <span className="nav-icon">{item.icon}</span>
            {!collapsed && <span className="nav-label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        {!collapsed && user && (
          <div className="sidebar-user">
            <div className="user-avatar">{user.name.charAt(0)}</div>
            <div className="user-info">
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.role}</span>
            </div>
          </div>
        )}
        <button className="sidebar-toggle" onClick={onToggle} title="Toggle sidebar">
          {collapsed ? '»' : '«'}
        </button>
        <button className="logout-btn" onClick={logout} title="Logout">
          {collapsed ? '⏻' : 'Sign Out'}
        </button>
      </div>
    </aside>
  )
}
