'use client'

import { useEffect } from 'react'

// Meta Pixel ID. Configurar en .env.local y en Vercel.
// Es público (se manda en cada request), así que va como NEXT_PUBLIC_.
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || ''

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
    _fbq?: unknown
  }
}

export default function MetaPixel() {
  useEffect(() => {
    if (!PIXEL_ID) return

    // Si el pixel ya está cargado (navegación entre páginas), sólo disparamos los eventos
    if (window.fbq) {
      window.fbq('track', 'PageView')
      window.fbq('track', 'ViewContent')
      return
    }

    // Snippet base oficial de Meta Pixel — inyectado una sola vez
    const snippet = `
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${PIXEL_ID}');
      fbq('track', 'PageView');
      fbq('track', 'ViewContent');
    `
    const tag = document.createElement('script')
    tag.text = snippet
    document.head.appendChild(tag)
  }, [])

  if (!PIXEL_ID) return null

  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        height="1"
        width="1"
        style={{ display: 'none' }}
        src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
        alt=""
      />
    </noscript>
  )
}
