const COUNTER_ENDPOINT = '/api/visitor-count'

export function useVisitorCount() {
  const increment = async (): Promise<number | null> => {
    try {
      const res = await fetch(COUNTER_ENDPOINT, { method: 'POST' })
      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      return data.count
    } catch {
      return null
    }
  }

  const fetchCount = async (): Promise<number | null> => {
    try {
      const res = await fetch(COUNTER_ENDPOINT)
      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      return data.count
    } catch {
      return null
    }
  }

  return { increment, fetchCount }
}