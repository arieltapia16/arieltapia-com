import { getPaypalAccessToken, getPaypalBaseUrl } from '@/lib/paypal'

const PRODUCT_NAME = 'De Cero a Clientes — Curso + Guiones'
// TEMPORARY: live-mode smoke test at USD 1. Revert to '49.00' after verifying.
const PRICE_USD = '1.00'

export async function POST() {
  try {
    const accessToken = await getPaypalAccessToken()
    const res = await fetch(`${getPaypalBaseUrl()}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            description: PRODUCT_NAME,
            amount: {
              currency_code: 'USD',
              value: PRICE_USD,
            },
          },
        ],
      }),
    })
    const data = await res.json()
    if (!res.ok) {
      console.error('PayPal create-order error:', data)
      return Response.json({ error: 'PayPal order creation failed' }, { status: 500 })
    }
    return Response.json({ id: data.id })
  } catch (err) {
    console.error('create-order route error:', err)
    return Response.json({ error: 'Internal error' }, { status: 500 })
  }
}
