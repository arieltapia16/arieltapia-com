import { Resend } from 'resend'
import { getPaypalAccessToken, getPaypalBaseUrl } from '@/lib/paypal'

type CaptureBody = {
  orderId: string
}

export async function POST(req: Request) {
  try {
    const body: CaptureBody = await req.json()
    const orderId = body.orderId
    if (!orderId) {
      return Response.json({ error: 'Missing orderId' }, { status: 400 })
    }

    const accessToken = await getPaypalAccessToken()
    const captureRes = await fetch(
      `${getPaypalBaseUrl()}/v2/checkout/orders/${orderId}/capture`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    const capture = await captureRes.json()
    if (!captureRes.ok || capture.status !== 'COMPLETED') {
      console.error('PayPal capture failed:', capture)
      return Response.json({ error: 'Capture failed', detail: capture }, { status: 500 })
    }

    const payerEmail: string | undefined = capture.payer?.email_address
    const givenName: string = capture.payer?.name?.given_name ?? ''
    const surname: string = capture.payer?.name?.surname ?? ''
    const fullName = `${givenName} ${surname}`.trim() || '—'
    const captureUnit = capture.purchase_units?.[0]?.payments?.captures?.[0]
    const amount = captureUnit?.amount?.value ?? '—'
    const currency = captureUnit?.amount?.currency_code ?? 'USD'
    const captureId = captureUnit?.id ?? capture.id
    const createdAt = captureUnit?.create_time ?? new Date().toISOString()

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const { error: sendError } = await resend.emails.send({
        from: 'Pagos arieltapia.com <onboarding@resend.dev>',
        to: 'arieltapiacom@gmail.com',
        subject: `Nuevo pago — De Cero a Clientes (${payerEmail ?? 'sin email'})`,
        html: `
          <h2>Nuevo pago recibido</h2>
          <p><strong>Email del cliente (Skool):</strong> ${payerEmail ?? '—'}</p>
          <p><strong>Nombre:</strong> ${fullName}</p>
          <p><strong>Monto:</strong> ${currency} ${amount}</p>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Capture ID:</strong> ${captureId}</p>
          <p><strong>Fecha:</strong> ${createdAt}</p>
          <hr/>
          <p style="color:#666;font-size:12px">Agregá <code>${payerEmail ?? '—'}</code> a tu comunidad de Skool.</p>
        `,
      })
      if (sendError) {
        console.error('Resend error on capture:', sendError)
      }
    } else {
      console.warn('RESEND_API_KEY not set — payment captured but no email sent')
    }

    return Response.json({
      ok: true,
      payerEmail,
      fullName,
      amount,
      currency,
    })
  } catch (err) {
    console.error('capture-order route error:', err)
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
