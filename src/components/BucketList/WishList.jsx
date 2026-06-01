import { Link } from 'react-router-dom'
import { useBucketList } from '../../context/BucketListContext'

export default function WishList() {
  const { bucketList, removeFromBucket, markVisited } = useBucketList()

  if (!bucketList.length) return (
    <div className="bucket-empty">
      <span className="bucket-empty-icon">🗺️</span>
      <p className="bucket-empty-title">Your bucket list is empty</p>
      <p className="bucket-empty-sub">Explore countries and add them here!</p>
      <Link to="/explore" className="btn btn-primary" style={{ marginTop: 16 }}>
        Explore Countries
      </Link>
    </div>
  )

  return (
    <div className="bucket-list">
      <div className="bucket-header">
        <span className="bucket-count">{bucketList.length} countries to visit</span>
      </div>
      {bucketList.map(country => (
        <div key={country.cca3} className="bucket-item">
          <img
            src={country.flags?.svg || country.flags?.png}
            alt={country.name.common}
            className="bucket-flag"
          />
          <div className="bucket-info">
            <Link to={`/country/${country.cca3}`} className="bucket-name">
              {country.name.common}
            </Link>
            <span className="bucket-region">{country.region}</span>
          </div>
          <div className="bucket-item-actions">
            <button
              className="btn btn-primary bucket-action-btn"
              onClick={() => markVisited(country)}
              title="Mark as visited"
            >
              ✈️ Visited
            </button>
            <button
              className="btn btn-ghost bucket-remove-btn"
              onClick={() => removeFromBucket(country.cca3)}
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
