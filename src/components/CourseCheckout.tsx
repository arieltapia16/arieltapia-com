'use client'

import { useEffect, useState } from 'react'
import WhopCheckout from './WhopCheckout'
import { WHOP_PLAN_ID, WHOP_PLAN_ID_GUIONES } from '@/lib/whop'

const BASE_PRICE = 19
const GUIONES_PRICE = 20

// Checkout del curso: arranca en el curso base (USD 19) y un checkbox suma el
// add-on "un mes de guiones completos" (+USD 20 → total USD 39), cambiando el
// embed de Whop al plan correspondiente. El embed se re-monta vía `key`.
export default function CourseCheckout({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  const [withGuiones, setWithGuiones] = useState(false)
  const planId = withGuiones ? WHOP_PLAN_ID_GUIONES : WHOP_PLAN_ID
  const total = BASE_PRICE + (withGuiones ? GUIONES_PRICE : 0)

  // Re-montar el embed de Whop es caro (recarga un iframe). Si el usuario tilda
  // varias veces seguidas, esperamos a que se "asiente" el plan antes de
  // re-montar — así una ráfaga de clicks produce un único re-montaje.
  const [embedPlan, setEmbedPlan] = useState(planId)
  const settling = embedPlan !== planId
  useEffect(() => {
    const t = setTimeout(() => setEmbedPlan(planId), 350)
    return () => clearTimeout(t)
  }, [planId])

  const dark = theme === 'dark'
  const box = dark
    ? 'border-white/15 bg-white/5 hover:border-[#FF5C00]/50'
    : 'border-neutral-300 bg-white hover:border-blue-600/50'
  const text = dark ? 'text-white/80' : 'text-neutral-800'
  const muted = dark ? 'text-white/45' : 'text-neutral-500'
  const accent = dark ? 'text-green-300' : 'text-green-700'
  const totalColor = dark ? 'text-green-400' : 'text-green-600'
  const checkbox = dark ? 'accent-[#FF5C00]' : 'accent-blue-600'

  return (
    <div className="flex flex-col gap-4">
      {/* Qué incluye / add-on */}
      <label className={`flex items-start gap-3 cursor-pointer border ${box} p-4 rounded-md transition-colors`}>
        <input
          type="checkbox"
          checked={withGuiones}
          onChange={(e) => setWithGuiones(e.target.checked)}
          className={`mt-0.5 h-5 w-5 shrink-0 ${checkbox}`}
        />
        <span className={`text-sm leading-relaxed text-left ${text}`}>
          <span className="font-semibold">Sumá un mes completo de guiones</span>{' '}
          <span className={`font-semibold ${accent}`}>+USD 20</span>
          <br />
          <span className={muted}>
            Al curso le agregás 30 días de guiones listos para grabar, armados para tu
            nicho. Total <span className="font-semibold">USD 39</span>.
          </span>
        </span>
      </label>

      {/* Total */}
      <div className="flex items-center justify-center gap-2">
        <span className={`text-xs uppercase tracking-widest ${muted}`}>Total</span>
        <span className={`font-serif text-3xl font-bold ${totalColor}`}>USD {total}</span>
      </div>

      {/* Embed de Whop — se re-monta (con debounce) al cambiar de plan */}
      <div className={settling ? 'opacity-50 transition-opacity' : 'transition-opacity'}>
        <WhopCheckout key={embedPlan} planId={embedPlan} theme={theme} />
      </div>
    </div>
  )
}
