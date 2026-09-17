import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL
  const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN

  if (!UPSTASH_URL || !UPSTASH_TOKEN) {
    return res.status(500).json({ error: 'Server misconfigured' })
  }

  const command = req.method === 'POST' ? 'incr' : 'get'

  try {
    const upstashRes = await fetch(`${UPSTASH_URL}/${command}/visitor-count`, {
      headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
    })

    if (!upstashRes.ok) throw new Error('Upstash request failed')

    const data = await upstashRes.json()
    const count = Number(data.result) || 0

    return res.status(200).json({ count })
  } catch (err) {
    return res.status(500).json({ count: null })
  }
}