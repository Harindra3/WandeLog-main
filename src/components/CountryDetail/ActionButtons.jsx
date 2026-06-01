import { useBucketList } from '../../context/BucketListContext'
import './CountryDetail.css'

export default function ActionButtons({ country }) {
  const { isInBucket, isVisited, addToBucket, removeFromBucket, markVisited, removeFromVisited } = useBucketList()
  const inBucket = isInBucket(country.cca3)
  const visited = isVisited(country.cca3)

  return (
    <div className="action-buttons">
      <button
        className={`btn action-btn-bucket ${inBucket ? 'active' : ''}`}
        onClick={() => inBucket ? removeFromBucket(country.cca3) : addToBucket(country)}
      >
        {inBucket ? '❤️ In Bucket List' : '🤍 Add to Bucket List'}
      </button>

      <button
        className={`btn action-btn-visited ${visited ? 'visited' : ''}`}
        onClick={() => visited ? removeFromVisited(country.cca3) : markVisited(country)}
      >
        {visited ? '✅ Mark as Unvisited' : '✈️ Mark as Visited'}
      </button>
    </div>
  )
}
