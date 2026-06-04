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

// Ref-count: el loader se carga una sola vez por página y se desmonta cuando
// se desmonta la última instancia. Así dos <WhopCheckout/> en la misma página
// no se pisan entre sí.
let mountedInstances = 0

export default function WhopCheckout({
  planId,
  theme = 'dark',
}: {
  planId: string
  theme?: 'light' | 'dark'
}) {
  useEffect(() => {
    mountedInstances++
    if (!document.getElementById(SCRIPT_ID)) {
      const tag = document.createElement('script')
      tag.id = SCRIPT_ID
      tag.src = SCRIPT_SRC
      tag.async = true
      document.body.appendChild(tag)
    }
    return () => {
      mountedInstances--
      if (mountedInstances <= 0) {
        const t = document.getElementById(SCRIPT_ID)
        if (t) t.remove()
        mountedInstances = 0
      }
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
