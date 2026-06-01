import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { fetchCountryByCode, fetchCountriesByCodes } from '../api/countriesApi'
import CountryInfo from '../components/CountryDetail/CountryInfo'
import ActionButtons from '../components/CountryDetail/ActionButtons'
import './Pages.css'

export default function CountryDetailPage() {
  const { code } = useParams()
  const navigate = useNavigate()
  const [country, setCountry] = useState(null)
  const [neighbors, setNeighbors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchCountryByCode(code)
      .then(async (data) => {
        setCountry(data)
        if (data.borders?.length) {
          const nb = await fetchCountriesByCodes(data.borders.slice(0, 6))
          setNeighbors(nb)
        } else {
          setNeighbors([])
        }
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [code])

  if (loading) return (
    <div className="page detail-loading">
      <div className="spinner" />
      <p style={{ marginTop: 16, color: 'var(--text-muted)' }}>Loading country…</p>
    </div>
  )

  if (error) return (
    <div className="page detail-error">
      <div style={{ fontSize: '3rem' }}>⚠️</div>
      <p>Failed to load country: {error}</p>
      <button className="btn btn-primary" onClick={() => navigate(-1)}>Go Back</button>
    </div>
  )

  if (!country) return null

  return (
    <div className="page detail-page">
      <div className="detail-inner">
        <button className="btn btn-ghost back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>

        <div className="detail-hero">
          <div className="detail-flag-wrap">
            <img
              src={country.flags?.svg || country.flags?.png}
              alt={`${country.name.common} flag`}
              className="detail-flag"
            />
          </div>
          <div className="detail-hero-info">
            <h1 className="detail-country-name">{country.name.common}</h1>
            <p className="detail-official-name">{country.name.official}</p>
            <div className="detail-quick-badges">
              <span className="badge badge-primary">📍 {country.capital?.[0] || '—'}</span>
              <span className="badge badge-gold">🌍 {country.region}</span>
              {country.subregion && <span className="badge badge-accent">{country.subregion}</span>}
            </div>
            <ActionButtons country={country} />
          </div>
        </div>

        <div className="detail-section">
          <h2 className="section-title">Country Facts</h2>
          <CountryInfo country={country} />
        </div>

        {neighbors.length > 0 && (
          <div className="detail-section">
            <h2 className="section-title">Neighbouring Countries</h2>
            <div className="neighbor-chips">
              {neighbors.map(nb => (
                <Link key={nb.cca3} to={`/country/${nb.cca3}`} className="neighbor-chip">
                  <img
                    src={nb.flags?.svg || nb.flags?.png}
                    alt={nb.name.common}
                    className="neighbor-flag"
                  />
                  <span>{nb.name.common}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
