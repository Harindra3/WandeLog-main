import { useState, useMemo } from 'react'
import SearchBar from '../components/Explore/SearchBar'
import CountryGrid from '../components/Explore/CountryGrid'
import { useCountries } from '../hooks/useCountries'
import './Pages.css'

const REGIONS = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
const SORT_OPTIONS = [
  { value: 'name', label: '🔤 Name' },
  { value: 'population', label: '👥 Population' },
  { value: 'area', label: '📐 Area' },
]

export default function ExplorePage() {
  const { countries, loading, error } = useCountries()
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('All')
  const [sort, setSort] = useState('name')

  const filtered = useMemo(() => {
    let list = [...countries]
    if (region !== 'All') list = list.filter(c => c.region === region)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(c =>
        c.name.common.toLowerCase().includes(q) ||
        c.name.official?.toLowerCase().includes(q) ||
        c.capital?.[0]?.toLowerCase().includes(q)
      )
    }
    list.sort((a, b) => {
      if (sort === 'population') return b.population - a.population
      if (sort === 'area') return (b.area || 0) - (a.area || 0)
      return a.name.common.localeCompare(b.name.common)
    })
    return list
  }, [countries, search, region, sort])

  return (
    <div className="page explore-page">
      <div className="explore-header">
        <div className="explore-title-row">
          <div>
            <h1 className="page-title">Explore Countries</h1>
            <p className="page-sub">
              {loading ? 'Loading…' : `${filtered.length} of ${countries.length} countries`}
            </p>
          </div>
          <div className="explore-controls">
            <SearchBar value={search} onChange={setSearch} />
            <select
              className="input-field sort-select"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="region-tabs">
          {REGIONS.map(r => (
            <button
              key={r}
              className={`region-tab ${region === r ? 'active' : ''}`}
              onClick={() => setRegion(r)}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <CountryGrid countries={filtered} loading={loading} error={error} />
    </div>
  )
}
