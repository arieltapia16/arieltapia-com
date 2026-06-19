import { Resend } from 'resend'
import { whopSdk } from '@/lib/whop-sdk'

// Whop calls this endpoint on subscription/payment events. On a confirmed
// purchase (payment.succeeded) we email the buyer's details to the owner —
// replacing the old Zapier automation.
//
// Setup:
//  1) Whop dashboard → Developer → Webhooks → add this URL:
//       https://<your-domain>/api/whop/webhook
//     and enable the "payment.succeeded" event.
//  2) Copy the webhook's signing secret into WHOP_WEBHOOK_SECRET (.env.local + Vercel).
//  3) RESEND_API_KEY must be set (already used by the other routes).
// Note: the buyer email is only present if the webhook has the
// `member:email:read` permission; otherwise it comes through null.

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export async function POST(req: Request) {
  const body = await req.text()
  const headers = Object.fromEntries(req.headers)

  // Verifies the Standard-Webhooks signature against WHOP_WEBHOOK_SECRET and
  // throws if it doesn't match, so spoofed requests are rejected.
  let event
  try {
    event = whopSdk.webhooks.unwrap(body, { headers })
  } catch (err) {
    // TEMP debug: surface the real verification error in the response so it
    // shows up in Whop's "Test webhook" Response box.
    const detail = err instanceof Error ? err.message : String(err)
    console.error('Whop webhook verification failed:', detail)
    return Response.json({ error: 'Invalid signature', detail }, { status: 400 })
  }

  if (event.type !== 'payment.succeeded') {
    return Response.json({ ok: true, ignored: event.type })
  }

  const p = event.data
  const buyerName = p.user?.name || p.user?.username || '—'
  const buyerEmail = p.user?.email || null
  const amount = p.subtotal ?? p.amount_after_fees ?? null
  const currency = (p.currency ?? '').toUpperCase()

  try {
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const { error: sendError } = await resend.emails.send({
        from: 'Compras arieltapia.com <onboarding@resend.dev>',
        to: 'arieltapiacom@gmail.com',
        subject: `Nueva compra (Whop) — ${buyerName}`,
        html: `
          <h2>Nueva compra confirmada por Whop</h2>
          <p><strong>Nombre:</strong> ${escapeHtml(buyerName)}</p>
          <p><strong>Usuario:</strong> ${escapeHtml(p.user?.username ?? '—')}</p>
          <p><strong>Email:</strong> ${
            buyerEmail
              ? escapeHtml(buyerEmail)
              : 'no disponible (el webhook necesita el permiso member:email:read)'
          }</p>
          <p><strong>Producto:</strong> ${escapeHtml(p.product?.title ?? '—')}</p>
          ${amount != null ? `<p><strong>Monto:</strong> ${currency} ${amount}</p>` : ''}
          <p><strong>Membership:</strong> ${escapeHtml(p.membership?.id ?? '—')} (${escapeHtml(
            p.membership?.status ?? '—',
          )})</p>
          <p><strong>Payment ID:</strong> ${escapeHtml(p.id ?? '—')}</p>
          <hr/>
          <p style="color:#888;font-size:12px">Payload completo:</p>
          <pre style="white-space:pre-wrap;font-size:12px;background:#f6f6f6;padding:10px;border-radius:6px">${escapeHtml(
            JSON.stringify(p, null, 2),
          )}</pre>
        `,
      })
      if (sendError) {
        console.error('Resend error (Whop webhook):', sendError)
      }
    } else {
      console.warn(
        'RESEND_API_KEY not set — Whop purchase received but no email sent',
      )
    }
  } catch (err) {
    // Log but still return 2xx so Whop doesn't keep retrying a delivered event.
    console.error('Whop webhook email error:', err)
  }

  return Response.json({ ok: true })
}
