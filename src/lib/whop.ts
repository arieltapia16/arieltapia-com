// Plan ID del producto en Whop. Configurar en .env.local y en Vercel.
// Es público (aparece en el HTML del checkout), así que va como NEXT_PUBLIC_.
export const WHOP_PLAN_ID = process.env.NEXT_PUBLIC_WHOP_PLAN_ID || ''
