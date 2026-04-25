/* global process */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const { firstName, phone, email, requestType, message } = req.body || {}

  if (!firstName || !phone || !email || !requestType) {
    return res.status(400).json({
      error: 'Missing required fields: firstName, phone, email, requestType.',
    })
  }

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({
      error: 'Missing RESEND_API_KEY environment variable.',
    })
  }

  const toEmail = process.env.INTAKE_TO_EMAIL || 'chris@hybrid.contact'
  const fromEmail =
    process.env.RESEND_FROM_EMAIL || 'M Racing Intake <onboarding@resend.dev>'

  const safeMessage = message?.trim() ? message.trim() : '(none)'

  const html = `
    <h2>New M Racing Intake</h2>
    <p><strong>First Name:</strong> ${firstName}</p>
    <p><strong>Phone Number:</strong> ${phone}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Request Type:</strong> ${requestType}</p>
    <p><strong>Message:</strong><br/>${safeMessage.replace(/\n/g, '<br/>')}</p>
  `

  const text = [
    'New M Racing Intake',
    '',
    `First Name: ${firstName}`,
    `Phone Number: ${phone}`,
    `Email: ${email}`,
    `Request Type: ${requestType}`,
    '',
    'Message:',
    safeMessage,
  ].join('\n')

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: `M Racing Intake - ${requestType}`,
        html,
        text,
        reply_to: email,
      }),
    })

    if (!resendResponse.ok) {
      const resendError = await resendResponse.text()
      return res.status(502).json({
        error: `Email provider error: ${resendError}`,
      })
    }

    return res.status(200).json({ ok: true })
  } catch {
    return res.status(500).json({ error: 'Failed to send intake email.' })
  }
}
