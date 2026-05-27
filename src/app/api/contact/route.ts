import { Resend } from 'resend'

type ContactBody = {
  name: string
  email: string
  rubro?: string
  answers?: Record<string, string>
  source?: string
}

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const body: ContactBody = await req.json()
    const { name, email, rubro, answers, source } = body
    if (!name || !email) return Response.json({ error: 'Missing fields' }, { status: 400 })

    const answersHtml = answers
      ? Object.entries(answers)
          .map(([q, a]) => `<p><strong>${q}</strong><br/>${a}</p>`)
          .join('')
      : ''

    const { error: sendError } = await resend.emails.send({
      from: 'Ariel Tapia Web <onboarding@resend.dev>',
      to: 'arieltapiacom@gmail.com',
      subject: `${source === 'oferta' ? '[Oferta] ' : ''}Nuevo registro: ${name}`,
      html: `
        <h2>Nuevo registro en arieltapia.com${source === 'oferta' ? ' — Formulario /oferta' : ''}</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${rubro ? `<p><strong>Mensaje:</strong> ${rubro}</p>` : ''}
        ${answersHtml}
      `,
    })

    if (sendError) {
      console.error('Resend error:', sendError)
      return Response.json({ error: sendError.message }, { status: 500 })
    }

    return Response.json({ ok: true })
  } catch (err) {
    console.error('Contact route error:', err)
    return Response.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
