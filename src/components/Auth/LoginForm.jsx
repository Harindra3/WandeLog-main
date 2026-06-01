import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Auth.css'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Please fill in all fields'); return }
    setLoading(true)
    try {
      await login(email, password)
      navigate('/explore')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const fillDemo = () => { setEmail('eve.holt@reqres.in'); setPassword('cityslicka') }

  return (
    <div className="auth-card fade-in">
      <div className="auth-logo">
        <span className="auth-globe">🌐</span>
        <h1 className="auth-brand">WanderLog</h1>
        <p className="auth-tagline">Your journey. Your bucket list.</p>
      </div>

      <div className="auth-header">
        <h2>Welcome back!</h2>
        <p>Sign in to continue your adventures.</p>
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
              autoComplete="email"
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
              autoComplete="current-password"
            />
            <button type="button" className="pass-toggle" onClick={() => setShowPass(s => !s)}>
              {showPass ? '🙈' : '👁️'}
            </button>
          </div>
          <div className="form-footer-row">
            <span />
            <button type="button" className="link-btn" onClick={fillDemo}>Use demo credentials</button>
          </div>
        </div>

        <button type="submit" className="btn btn-primary auth-submit" disabled={loading}>
          {loading ? <><span className="btn-spinner" />Signing in…</> : 'Sign In'}
        </button>

        <div className="auth-divider"><span>or</span></div>

        <button type="button" className="btn btn-outline google-btn" disabled>
          <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20H24v8h11.3C33.5 33.5 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34.5 6.5 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-8 20-20 0-1.3-.1-2.7-.4-4z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 18.9 13 24 13c3.1 0 5.8 1.1 8 2.9l5.7-5.7C34.5 6.5 29.5 4 24 4c-7.5 0-14 4.1-17.7 10.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 10-1.8 13.7-4.8l-6.3-5.3C29.4 35.6 26.8 36 24 36c-5.1 0-9.5-2.5-11.3-7H6.3C9.9 39.8 16.4 44 24 44z"/><path fill="#1976D2" d="M43.6 20H24v8h11.3c-.9 2.5-2.5 4.6-4.6 6l6.3 5.3C41.1 35.9 44 30.4 44 24c0-1.3-.1-2.7-.4-4z"/></svg>
          Continue with Google
        </button>
      </form>

      <p className="auth-switch">
        Don't have an account? <Link to="/signup">Create account</Link>
      </p>
    </div>
  )
}
