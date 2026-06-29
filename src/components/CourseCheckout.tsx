'use client'

import WhopCheckout from './WhopCheckout'
import { WHOP_PLAN_ID } from '@/lib/whop'

// Checkout del curso: precio único USD 49 con los guiones incluidos.
export default function CourseCheckout({ theme = 'light' }: { theme?: 'light' | 'dark' }) {
  const dark = theme === 'dark'
  const box = dark ? 'border-white/15 bg-white/5' : 'border-neutral-300 bg-white'
  const text = dark ? 'text-white/80' : 'text-neutral-800'
  const muted = dark ? 'text-white/45' : 'text-neutral-500'

  return (
    <div className="flex flex-col gap-4">
      {/* Qué incluye */}
      <div className={`border ${box} p-4 rounded-md text-left`}>
        <span className={`text-sm leading-relaxed ${text}`}>
          <span className="font-semibold">Acceso completo al curso + un mes de guiones</span>
          <br />
          <span className={muted}>
            30 días de guiones listos para grabar, armados para tu nicho —
            incluidos en el precio.
          </span>
        </span>
      </div>

      {/* Embed de Whop */}
      <WhopCheckout planId={WHOP_PLAN_ID} theme={theme} />
    </div>
  )
}
