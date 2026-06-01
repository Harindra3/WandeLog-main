import './CountryDetail.css'

export default function CountryInfo({ country }) {
  const languages = country.languages ? Object.values(country.languages).join(', ') : '—'
  const currencies = country.currencies
    ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol || ''})`).join(', ')
    : '—'

  const stats = [
    { icon: '🏛️', label: 'Capital', value: country.capital?.[0] || '—' },
    { icon: '👥', label: 'Population', value: (country.population / 1e6).toFixed(2) + 'M' },
    { icon: '🗣️', label: 'Languages', value: languages },
    { icon: '💱', label: 'Currency', value: currencies },
    { icon: '🕒', label: 'Timezone', value: country.timezones?.[0] || '—' },
    { icon: '🌍', label: 'Region', value: `${country.region}${country.subregion ? ' · ' + country.subregion : ''}` },
  ]

  return (
    <div className="country-info">
      <div className="info-stats">
        {stats.map(stat => (
          <div key={stat.label} className="info-stat">
            <span className="stat-icon">{stat.icon}</span>
            <div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-value">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
