import { useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import Badge from '../components/ui/Badge'
import Modal from '../components/ui/Modal'
import { mockUsers, ROLES } from '../data/mockData'

export default function Users() {
  const [users, setUsers] = useState(mockUsers)
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('All')
  const [modal, setModal] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', role: 'Staff', status: 'Active' })

  const filtered = users.filter((u) => {
    const matchSearch =
      !search ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
    const matchRole = roleFilter === 'All' || u.role === roleFilter
    return matchSearch && matchRole
  })

  const openAdd = () => {
    setForm({ name: '', email: '', role: 'Staff', status: 'Active' })
    setModal('add')
  }

  const openEdit = (user) => {
    setForm({ name: user.name, email: user.email, role: user.role, status: user.status })
    setModal(user.id)
  }

  const saveUser = () => {
    if (modal === 'add') {
      setUsers((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...form,
          lastLogin: 'Never',
        },
      ])
    } else {
      setUsers((prev) =>
        prev.map((u) => (u.id === modal ? { ...u, ...form } : u))
      )
    }
    setModal(null)
  }

  const toggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u
      )
    )
  }

  return (
    <div>
      <PageHeader
        title="Users & Roles"
        subtitle={`${users.length} team members`}
        actions={
          <button className="btn btn-primary" onClick={openAdd}>Add User</button>
        }
      />

      <div className="role-cards">
        {ROLES.map((role) => {
          const count = users.filter((u) => u.role === role).length
          return (
            <div key={role} className="role-card">
              <Badge status={role}>{role}</Badge>
              <span className="role-count">{count}</span>
            </div>
          )
        })}
      </div>

      <div className="filters-bar">
        <input
          type="search"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="All">All Roles</option>
          {ROLES.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div className="table-card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td>
                  <div className="user-cell">
                    <div className="user-avatar sm">{u.name.charAt(0)}</div>
                    <strong>{u.name}</strong>
                  </div>
                </td>
                <td>{u.email}</td>
                <td><Badge status={u.role}>{u.role}</Badge></td>
                <td><Badge status={u.status}>{u.status}</Badge></td>
                <td className="text-muted">{u.lastLogin}</td>
                <td>
                  <div className="action-group">
                    <button className="btn btn-sm btn-outline" onClick={() => openEdit(u)}>Edit</button>
                    <button className="btn btn-sm btn-ghost" onClick={() => toggleStatus(u.id)}>
                      {u.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        open={!!modal}
        onClose={() => setModal(null)}
        title={modal === 'add' ? 'Add New User' : 'Edit User'}
      >
        <div className="modal-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter full name"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="user@soothra.com"
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Role</label>
              <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                {ROLES.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="modal-actions">
            <button className="btn btn-ghost" onClick={() => setModal(null)}>Cancel</button>
            <button className="btn btn-primary" onClick={saveUser}>
              {modal === 'add' ? 'Create User' : 'Save Changes'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
