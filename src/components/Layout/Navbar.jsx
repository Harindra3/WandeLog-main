import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useBucketList } from '../../context/BucketListContext'
import './Navbar.css'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { bucketList, visited } = useBucketList()
  const location = useLocation()

  const navItems = [
    { path: '/explore', label: 'Explore', icon: '🌍' },
    { path: '/bucket-list', label: 'My Lists', icon: '📋', badge: bucketList.length + visited.length },
  ]

  return (
    <nav className="navbar">
      <Link to="/explore" className="navbar-brand">
        <span className="brand-globe">🌐</span>
        <span className="brand-name">WanderLog</span>
      </Link>

      <div className="navbar-nav">
        {navItems.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
            {item.badge > 0 && <span className="nav-badge">{item.badge}</span>}
          </Link>
        ))}
      </div>

      <div className="navbar-right">
        <div className="user-pill">
          <div className="user-avatar">{user?.email?.[0].toUpperCase()}</div>
          <span className="user-email">{user?.email?.split('@')[0]}</span>
        </div>
        <button className="btn btn-ghost logout-btn" onClick={logout} title="Sign out">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
        </button>
      </div>
    </nav>
  )
}
