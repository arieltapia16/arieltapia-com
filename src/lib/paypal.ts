const SANDBOX_BASE = 'https://api-m.sandbox.paypal.com'
const LIVE_BASE = 'https://api-m.paypal.com'

export function getPaypalBaseUrl(): string {
  return process.env.PAYPAL_ENV === 'live' ? LIVE_BASE : SANDBOX_BASE
}

export async function getPaypalAccessToken(): Promise<string> {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET
  if (!clientId || !clientSecret) {
    throw new Error('Missing PAYPAL_CLIENT_ID / PAYPAL_CLIENT_SECRET')
  }
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  const res = await fetch(`${getPaypalBaseUrl()}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })
  if (!res.ok) {
    throw new Error(`PayPal token request failed: ${res.status}`)
  }
  const data = await res.json() as { access_token: string }
  return data.access_token
}
