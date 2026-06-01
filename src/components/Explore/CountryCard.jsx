import { Link } from 'react-router-dom'
import { useBucketList } from '../../context/BucketListContext'

export default function CountryCard({ country }) {
  const { isInBucket, isVisited, addToBucket, removeFromBucket } = useBucketList()
  const inBucket = isInBucket(country.cca3)
  const visited = isVisited(country.cca3)

  const handleBucket = (e) => {
    e.preventDefault()
    e.stopPropagation()
    inBucket ? removeFromBucket(country.cca3) : addToBucket(country)
  }

  return (
    <Link to={`/country/${country.cca3}`} className="country-card">
      <div className="card-flag-wrap">
        <img
          src={country.flags?.svg || country.flags?.png}
          alt={`${country.name.common} flag`}
          className="card-flag"
          loading="lazy"
        />
        {visited && <span className="card-visited-badge">✓ Visited</span>}
      </div>
      <div className="card-body">
        <h3 className="card-name">{country.name.common}</h3>
        <div className="card-meta">
          <span className="card-capital">
            📍 {country.capital?.[0] || '—'}
          </span>
          <span className="card-pop">
            👥 {(country.population / 1e6).toFixed(1)}M
          </span>
        </div>
        <div className="card-region">
          <span className="badge badge-primary">{country.region}</span>
        </div>
      </div>
      <div className="card-actions">
        <button
          className={`card-action-btn ${inBucket ? 'active' : ''}`}
          onClick={handleBucket}
          title={inBucket ? 'Remove from bucket list' : 'Add to bucket list'}
        >
          {inBucket ? '❤️' : '🤍'}
        </button>
        <span className="card-check">{visited ? '✅' : '⬜'}</span>
      </div>
    </Link>
  )
}
