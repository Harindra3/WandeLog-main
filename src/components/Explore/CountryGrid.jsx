import CountryCard from './CountryCard'

export default function CountryGrid({ countries, loading, error }) {
  if (loading) return (
    <div className="grid-state">
      <div className="skeleton-grid">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton-flag" />
            <div className="skeleton-body">
              <div className="skeleton-line wide" />
              <div className="skeleton-line narrow" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  if (error) return (
    <div className="grid-state center">
      <div className="state-icon">⚠️</div>
      <p className="state-title">Failed to load countries</p>
      <p className="state-sub">{error}</p>
    </div>
  )

  if (!countries.length) return (
    <div className="grid-state center">
      <div className="state-icon">🔍</div>
      <p className="state-title">No countries found</p>
      <p className="state-sub">Try a different search or filter</p>
    </div>
  )

  return (
    <div className="country-grid">
      {countries.map((country, i) => (
        <div key={country.cca3} style={{ animationDelay: `${Math.min(i * 0.03, 0.5)}s` }} className="grid-item-anim">
          <CountryCard country={country} />
        </div>
      ))}
    </div>
  )
}
