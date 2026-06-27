import StatCard from '../components/ui/StatCard'
import Badge from '../components/ui/Badge'
import {
  dashboardStats,
  monthlyEnquiries,
  appointmentBreakdown,
  mockEnquiries,
  mockAppointments,
  mockActivityLogs,
} from '../data/mockData'
import { formatDate } from '../utils/helpers'

export default function Dashboard() {
  const recentEnquiries = mockEnquiries.slice(0, 5)
  const upcomingAppointments = mockAppointments
    .filter((a) => a.status === 'Approved' || a.status === 'Pending')
    .slice(0, 5)
  const recentActivity = mockActivityLogs.slice(0, 6)
  const maxEnquiry = Math.max(...monthlyEnquiries.map((m) => m.count))

  return (
    <div className="dashboard">
      <div className="stats-grid">
        <StatCard label="Total Enquiries" value={dashboardStats.totalEnquiries} change="+12% this month" icon="✉" />
        <StatCard label="New Enquiries" value={dashboardStats.newEnquiries} change="Today: 3" icon="★" accent="accent-coral" />
        <StatCard label="Pending Appointments" value={dashboardStats.pendingAppointments} change="Needs action" icon="◷" accent="accent-amber" />
        <StatCard label="Conversion Rate" value={`${dashboardStats.conversionRate}%`} change="+5% vs last month" icon="↗" accent="accent-green" />
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h3>Monthly Enquiries</h3>
          </div>
          <div className="bar-chart">
            {monthlyEnquiries.map((m) => (
              <div key={m.month} className="bar-col">
                <div className="bar-fill" style={{ height: `${(m.count / maxEnquiry) * 100}%` }}>
                  <span className="bar-value">{m.count}</span>
                </div>
                <span className="bar-label">{m.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Appointment Status</h3>
          </div>
          <div className="donut-legend">
            {appointmentBreakdown.map((item) => (
              <div key={item.status} className="legend-row">
                <span className="legend-dot" style={{ background: item.color }} />
                <span className="legend-label">{item.status}</span>
                <span className="legend-count">{item.count}</span>
                <div className="legend-bar">
                  <div
                    className="legend-bar-fill"
                    style={{
                      width: `${(item.count / 93) * 100}%`,
                      background: item.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-grid three-col">
        <div className="card">
          <div className="card-header">
            <h3>Recent Enquiries</h3>
          </div>
          <div className="mini-table">
            {recentEnquiries.map((e) => (
              <div key={e.id} className="mini-row">
                <div>
                  <strong>{e.name}</strong>
                  <span className="text-muted">{e.condition}</span>
                </div>
                <Badge status={e.status}>{e.status}</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Upcoming Appointments</h3>
          </div>
          <div className="mini-table">
            {upcomingAppointments.map((a) => (
              <div key={a.id} className="mini-row">
                <div>
                  <strong>{a.patient}</strong>
                  <span className="text-muted">{formatDate(a.date)} · {a.time}</span>
                </div>
                <Badge status={a.status}>{a.status}</Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3>Recent Activity</h3>
          </div>
          <div className="activity-feed">
            {recentActivity.map((log) => (
              <div key={log.id} className="activity-item">
                <div className="activity-dot" />
                <div>
                  <p>{log.action}</p>
                  <span className="text-muted">{log.user} · {log.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
