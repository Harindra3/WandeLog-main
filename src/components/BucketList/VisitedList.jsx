import { Link } from 'react-router-dom'
import { useBucketList } from '../../context/BucketListContext'

export default function VisitedList() {
  const { visited, removeFromVisited } = useBucketList()

  if (!visited.length) return (
    <div className="bucket-empty">
      <span className="bucket-empty-icon">✈️</span>
      <p className="bucket-empty-title">No visited countries yet</p>
      <p className="bucket-empty-sub">Mark countries as visited from your bucket list or country detail page!</p>
    </div>
  )

  const totalPop = visited.reduce((acc, c) => acc + (c.population || 0), 0)

  return (
    <div className="bucket-list">
      <div className="bucket-header">
        <span className="bucket-count">{visited.length} countries visited</span>
        <span className="bucket-stat">🌍 {(totalPop / 1e9).toFixed(2)}B people reached</span>
      </div>
      {visited.map(country => (
        <div key={country.cca3} className="bucket-item visited-item">
          <img
            src={country.flags?.svg || country.flags?.png}
            alt={country.name.common}
            className="bucket-flag"
          />
          <div className="bucket-info">
            <Link to={`/country/${country.cca3}`} className="bucket-name">
              {country.name.common}
            </Link>
            <span className="bucket-region">{country.region} · {(country.population / 1e6).toFixed(1)}M</span>
          </div>
          <div className="bucket-item-actions">
            <span className="visited-check">✅</span>
            <button
              className="btn btn-ghost bucket-remove-btn"
              onClick={() => removeFromVisited(country.cca3)}
              title="Remove"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
