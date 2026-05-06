import { Resend } from 'resend'

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { name, email, rubro } = await req.json()
    if (!name || !email) return Response.json({ error: 'Missing fields' }, { status: 400 })

    await resend.emails.send({
      from: 'Ariel Tapia Web <onboarding@resend.dev>',
      to: 'arieltapiacom@gmail.com',
      subject: `Nuevo registro: ${name}`,
      html: `
        <h2>Nuevo registro en arieltapia.com</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${rubro ? `<p><strong>Rubro:</strong> ${rubro}</p>` : ''}
      `,
    })

    return Response.json({ ok: true })
  } catch {
    return Response.json({ error: 'Failed to send email' }, { status: 500 })
  }
}
