'use client'

import { useState } from 'react'
import {
  PayPalScriptProvider,
  PayPalButtons,
  type ReactPayPalScriptOptions,
} from '@paypal/react-paypal-js'

type CaptureResult = {
  ok: boolean
  payerEmail?: string
  fullName?: string
  amount?: string
  currency?: string
}

export default function PaypalCheckoutButton() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const [success, setSuccess] = useState<CaptureResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  if (!clientId) {
    return (
      <p className="text-white/40 text-xs">
        Pagos disponibles próximamente. Configurá <code>NEXT_PUBLIC_PAYPAL_CLIENT_ID</code> para activarlos.
      </p>
    )
  }

  if (success) {
    return (
      <div className="border border-[#FF5C00]/40 bg-[#FF5C00]/8 px-5 py-4 text-left">
        <p className="text-white font-semibold text-base mb-1">¡Listo! Pago recibido.</p>
        <p className="text-white/60 text-sm leading-relaxed">
          Te vamos a agregar a Skool en las próximas horas con el email{' '}
          <span className="text-white font-medium">{success.payerEmail ?? '—'}</span>.
        </p>
      </div>
    )
  }

  const options: ReactPayPalScriptOptions = {
    clientId,
    currency: 'USD',
    intent: 'capture',
    enableFunding: 'card',
    disableFunding: 'paylater,credit',
    locale: 'es_AR',
  }

  return (
    <div className="w-full">
      <PayPalScriptProvider options={options}>
        <PayPalButtons
          style={{ layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' }}
          createOrder={async () => {
            setError(null)
            const res = await fetch('/api/paypal/create-order', { method: 'POST' })
            if (!res.ok) {
              const detail = await res.json().catch(() => ({}))
              throw new Error(detail.error || 'No se pudo crear la orden')
            }
            const { id } = await res.json()
            return id as string
          }}
          onApprove={async (data) => {
            const res = await fetch('/api/paypal/capture-order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ orderId: data.orderID }),
            })
            if (!res.ok) {
              const detail = await res.json().catch(() => ({}))
              setError(detail.error || 'El pago no se pudo capturar')
              return
            }
            const result: CaptureResult = await res.json()
            setSuccess(result)
          }}
          onError={(err) => {
            console.error('PayPal error:', err)
            setError('Error al procesar el pago. Probá de nuevo.')
          }}
        />
      </PayPalScriptProvider>
      {error && (
        <p className="text-red-400 text-xs mt-2">{error}</p>
      )}
    </div>
  )
}
