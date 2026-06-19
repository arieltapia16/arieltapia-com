import { Whop } from '@whop/sdk'

// Whop SDK client used to verify incoming webhooks. Verification only needs the
// webhook secret (read from WHOP_WEBHOOK_SECRET), but the SDK constructor still
// requires an apiKey, so we fall back to a placeholder when one isn't set — it's
// never used for `webhooks.unwrap()`.
export const whopSdk = new Whop({
  apiKey: process.env.WHOP_API_KEY ?? 'whop-webhook-only',
})
