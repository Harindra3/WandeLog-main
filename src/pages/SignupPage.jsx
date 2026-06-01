import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import SignupForm from '../components/Auth/SignupForm'
import './Pages.css'

export default function SignupPage() {
  const { user } = useAuth()
  if (user) return <Navigate to="/explore" replace />

  return (
    <div className="auth-page">
      <div className="auth-bg-pattern" />
      <div className="auth-content">
        <SignupForm />
        <p className="auth-page-tagline">Discover the world, one country at a time 🌍</p>
      </div>
    </div>
  )
}
