import { useBucketList } from '../context/BucketListContext'
import BucketListTabs from '../components/BucketList/BucketListTabs'
import './Pages.css'

export default function BucketListPage() {
  const { bucketList, visited } = useBucketList()
  const totalPop = [...bucketList, ...visited].reduce((a, c) => a + (c.population || 0), 0)

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Travel Lists</h1>
          <p className="page-sub">Track your wanderlust and adventures</p>
        </div>
        <div className="bucket-summary-cards">
          <div className="summary-card">
            <div className="summary-num">{bucketList.length}</div>
            <div className="summary-label">Want to visit</div>
          </div>
          <div className="summary-card visited-card">
            <div className="summary-num">{visited.length}</div>
            <div className="summary-label">Visited</div>
          </div>
          <div className="summary-card pop-card">
            <div className="summary-num">{(totalPop / 1e9).toFixed(2)}B</div>
            <div className="summary-label">World coverage</div>
          </div>
        </div>
      </div>

      <BucketListTabs />
    </div>
  )
}
