export default function StatCard({ label, value, change, icon, accent }) {
  return (
    <div className={`stat-card ${accent || ''}`}>
      <div className="stat-card-top">
        <span className="stat-label">{label}</span>
        <span className="stat-icon">{icon}</span>
      </div>
      <div className="stat-value">{value}</div>
      {change && <div className="stat-change">{change}</div>}
    </div>
  )
}
