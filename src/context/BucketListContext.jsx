import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

const BucketListContext = createContext(null)

export function BucketListProvider({ children }) {
  const { user } = useAuth()
  const [bucketList, setBucketList] = useState([])
  const [visited, setVisited] = useState([])

  const storageKey = (type) => `wanderlog_${type}_${user?.email || 'guest'}`

  useEffect(() => {
    if (!user) { setBucketList([]); setVisited([]); return }
    try {
      setBucketList(JSON.parse(localStorage.getItem(storageKey('bucket'))) || [])
      setVisited(JSON.parse(localStorage.getItem(storageKey('visited'))) || [])
    } catch { setBucketList([]); setVisited([]) }
  }, [user])

  const save = (type, data) => {
    localStorage.setItem(storageKey(type), JSON.stringify(data))
  }

  const addToBucket = (country) => {
    if (bucketList.find(c => c.cca3 === country.cca3)) return
    const next = [...bucketList, country]
    setBucketList(next)
    save('bucket', next)
  }

  const removeFromBucket = (cca3) => {
    const next = bucketList.filter(c => c.cca3 !== cca3)
    setBucketList(next)
    save('bucket', next)
  }

  const markVisited = (country) => {
    if (!visited.find(c => c.cca3 === country.cca3)) {
      const nextV = [...visited, country]
      setVisited(nextV)
      save('visited', nextV)
    }
    removeFromBucket(country.cca3)
  }

  const removeFromVisited = (cca3) => {
    const next = visited.filter(c => c.cca3 !== cca3)
    setVisited(next)
    save('visited', next)
  }

  const isInBucket = (cca3) => bucketList.some(c => c.cca3 === cca3)
  const isVisited = (cca3) => visited.some(c => c.cca3 === cca3)

  return (
    <BucketListContext.Provider value={{
      bucketList, visited,
      addToBucket, removeFromBucket,
      markVisited, removeFromVisited,
      isInBucket, isVisited,
    }}>
      {children}
    </BucketListContext.Provider>
  )
}

export const useBucketList = () => useContext(BucketListContext)
