import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Auth.css'

export default function SignupForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Please fill in all fields'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      await register(email, password)
      navigate('/explore')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-card fade-in">
      <div className="auth-logo">
        <span className="auth-globe">🌐</span>
        <h1 className="auth-brand">WanderLog</h1>
        <p className="auth-tagline">Your journey. Your bucket list.</p>
      </div>

      <div className="auth-header">
        <h2>Create account</h2>
        <p>Start your travel adventure today.</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {error && <div className="error-msg">{error}</div>}

        <div className="form-group">
          <label>Email</label>
          <div className="input-icon-wrap">
            <span className="input-icon">✉️</span>
            <input
              type="email"
              className="input-field has-icon"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Password</label>
          <div className="input-icon-wrap">
            <span className="input-icon">🔒</span>
            <input
              type={showPass ? 'text' : 'password'}
              className="input-field has-icon has-icon-right"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button type="button" className="pass-toggle" onClick={() => setShowPass(s => !s)}>
              {showPass ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <p className="auth-note">
          📌 Note: Reqres only accepts specific test emails (e.g. <strong>eve.holt@reqres.in</strong>).
          Other emails will return an error — that's expected!
        </p>

        <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
          {loading ? <><span className="btn-spinner" />Creating account…</> : 'Create Account'}
        </button>
      </form>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </div>
  )
}
