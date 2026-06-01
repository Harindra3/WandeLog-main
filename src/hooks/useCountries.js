import { useState, useEffect } from 'react'
import { fetchAllCountries } from '../api/countriesApi'

export function useCountries() {
  const [countries, setCountries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAllCountries()
      .then(setCountries)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { countries, loading, error }
}
