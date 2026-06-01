import { useState } from 'react'
import WishList from './WishList'
import VisitedList from './VisitedList'
import './BucketList.css'

export default function BucketListTabs() {
  const [tab, setTab] = useState('wish')

  return (
    <div className="bucket-container">
      <div className="bucket-tabs">
        <button
          className={`bucket-tab ${tab === 'wish' ? 'active' : ''}`}
          onClick={() => setTab('wish')}
        >
          🤍 Wish List
        </button>
        <button
          className={`bucket-tab ${tab === 'visited' ? 'active' : ''}`}
          onClick={() => setTab('visited')}
        >
          ✅ Visited
        </button>
      </div>

      <div className="bucket-panel">
        {tab === 'wish' ? <WishList /> : <VisitedList />}
      </div>
    </div>
  )
}
