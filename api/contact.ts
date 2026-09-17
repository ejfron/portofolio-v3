import type { VercelRequest, VercelResponse } from '@vercel/node'


const TO_EMAIL = 'edgarjugado0516@gmail.com'

const FROM_EMAIL = 'Portfolio Contact <onboarding@resend.dev>'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY
  if (!RESEND_API_KEY) {
    return res.status(500).json({ error: 'Server misconfigured' })
  }

  const { email, subject, message } = (req.body ?? {}) as {
    email?: string
    subject?: string
    message?: string
  }

  if (!email || !subject || !message) {
    return res.status(400).json({ error: 'Please fill in all fields.' })
  }
  if (!EMAIL_PATTERN.test(email)) {
    return res.status(400).json({ error: 'That email address looks off.' })
  }
  if (message.length > 5000 || subject.length > 200) {
    return res.status(400).json({ error: 'Message is too long.' })
  }

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        html: `
          <p><strong>From:</strong> ${escapeHtml(email)}</p>
          <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
          <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
        `,
      }),
    })

    if (!resendRes.ok) {
      const errText = await resendRes.text()
      console.error('Resend error:', errText)
      return res.status(502).json({ error: 'Could not send right now. Try again shortly.' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Contact send error:', err)
    return res.status(500).json({ error: 'Could not send right now. Try again shortly.' })
  }
}