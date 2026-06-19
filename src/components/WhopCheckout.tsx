'use client'

import { useEffect } from 'react'

// ============================================================
// WHOP CHECKOUT EMBEBIDO
// ============================================================
// Para que esto funcione:
// 1) En el dashboard de Whop copiá el plan_id de tu producto y pegalo en
//    src/lib/whop.ts (constante WHOP_PLAN_ID).
// 2) Si el snippet oficial que copiás de Whop apunta a otro script o usa
//    un nombre de data-attribute distinto, reemplazá SCRIPT_SRC y/o el div
//    target de abajo. El resto (useEffect + cleanup) no se toca.
// ============================================================

const SCRIPT_SRC = 'https://js.whop.com/static/checkout/loader.js'
const SCRIPT_ID = 'whop-checkout-loader'

// El loader de Whop se inyecta UNA sola vez por página y nunca se remueve.
// El loader trae su propio MutationObserver, así que monta automáticamente
// cualquier div `data-whop-checkout-plan-id` nuevo (p. ej. cuando el checkbox
// del add-on re-monta el embed con otro plan). Removerlo y re-inyectarlo en
// cada cambio provocaba "CreateListFromArrayLike called on non-object" y el
// embed dejaba de renderizar.
export default function WhopCheckout({
  planId,
  theme = 'dark',
}: {
  planId: string
  theme?: 'light' | 'dark'
}) {
  useEffect(() => {
    if (!document.getElementById(SCRIPT_ID)) {
      const tag = document.createElement('script')
      tag.id = SCRIPT_ID
      tag.src = SCRIPT_SRC
      tag.async = true
      document.body.appendChild(tag)
    }
  }, [])

  const noteColor = theme === 'light' ? 'text-neutral-500' : 'text-white/45'

  if (!planId) {
    return (
      <div className="border border-dashed border-white/20 bg-white/5 p-6 text-center text-sm text-white/55 leading-relaxed">
        🔧 Falta <code className="text-white/80">NEXT_PUBLIC_WHOP_PLAN_ID</code> en el entorno
        (configurar en .env.local y en Vercel).
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* ⬇️ DIV TARGET DEL EMBED DE WHOP ⬇️
          Si el snippet del dashboard usa otro nombre de atributo, reemplazá
          este div literal por el HTML que te da Whop. */}
      <div
        data-whop-checkout-plan-id={planId}
        data-whop-checkout-theme={theme}
        className="min-h-[420px] w-full"
      />
      <p className={`${noteColor} text-xs sm:text-sm text-center leading-relaxed mt-3`}>
        ✉️ Una vez completado el pago, revisá tu email — ahí te llega el acceso al curso.
      </p>
    </div>
  )
}
