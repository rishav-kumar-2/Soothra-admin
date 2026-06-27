import { useAuth } from '../../context/AuthContext'

export default function Header({ title }) {
  const { user } = useAuth()
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <header className="admin-header">
      <h2 className="header-title">{title}</h2>
      <div className="header-right">
        <span className="header-date">{today}</span>
        <div className="header-user">
          <div className="header-avatar">{user?.name?.charAt(0)}</div>
          <span>{user?.name}</span>
        </div>
      </div>
    </header>
  )
}
