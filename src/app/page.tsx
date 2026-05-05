'use client'

import Image from 'next/image'
import { useState } from 'react'
import { FaInstagram, FaTiktok } from 'react-icons/fa6'

export default function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      })
      setSubmitted(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-[#0D0D0D] min-h-screen">

      {/* Hero */}
      <section className="relative h-screen min-h-[600px] flex flex-col">

        {/* Background blurred photo */}
        <Image
          src="/bg.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Name top center */}
        <div className="relative z-10 pt-8 flex justify-center">
          <span className="text-white text-xs font-light tracking-[0.35em] uppercase">
            Ariel Tapia
          </span>
        </div>

        {/* Center: phone + title */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center gap-8">

          {/* Phone mockup */}
          <div className="relative w-[160px] h-[320px] sm:w-[190px] sm:h-[380px] bg-black rounded-[36px] border-[7px] border-white/20 shadow-2xl overflow-hidden shrink-0 flex flex-col">
            {/* Dynamic island */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-10" />
            <div className="h-10 shrink-0" />
            <div className="flex-1 relative">
              <Image
                src="/ariel.jpg"
                alt="Ariel Tapia"
                fill
                className="object-cover object-top"
              />
              {/* black overlay — covers body below shirt pocket (~57% of image) */}
              <div className="absolute bottom-0 inset-x-0 h-[43%] bg-black" />
            </div>
            <div className="h-10 shrink-0" />
          </div>

          {/* Title */}
          <div>
            <div className="w-10 h-[2px] bg-[#FF5C00] mx-auto mb-5" />
            <h1 className="font-serif text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-xl">
              Algo poderoso está por llegar
            </h1>
            <p className="text-white/60 text-base sm:text-lg mt-4 max-w-sm mx-auto">
              Te enseño a vender en redes. Sin trucos. Con método.
            </p>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="relative z-10 pb-8 flex justify-center">
          <div className="w-px h-10 bg-white/25" />
        </div>
      </section>

      {/* Form section */}
      <section className="py-20 px-6 flex flex-col items-center">
        <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-4">Avisame</p>
        <h2 className="font-serif text-white text-3xl sm:text-4xl font-semibold text-center mb-3">
          Sé el primero en enterarte
        </h2>
        <p className="text-white/40 text-sm text-center mb-10 max-w-xs">
          Dejá tus datos y te aviso cuando abramos.
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full max-w-md">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre"
              required
              className="bg-white/5 text-white placeholder-white/25 px-4 py-3 border border-white/10 outline-none focus:border-[#FF5C00] transition text-sm"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="bg-white/5 text-white placeholder-white/25 px-4 py-3 border border-white/10 outline-none focus:border-[#FF5C00] transition text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#FF5C00] text-white text-sm font-semibold py-3 px-6 hover:bg-[#e05200] transition-colors tracking-widest uppercase disabled:opacity-50"
            >
              {loading ? 'Enviando...' : 'Avisame cuando llegue'}
            </button>
          </form>
        ) : (
          <p className="text-[#FF5C00] text-base text-center">
            ¡Listo! Te avisamos cuando abramos.
          </p>
        )}

        {/* Social icons */}
        <div className="flex gap-6 mt-16">
          <a
            href="https://www.instagram.com/arieltapiacom"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="text-white/30 hover:text-[#FF5C00] transition-colors"
          >
            <FaInstagram size={24} />
          </a>
          <a
            href="https://www.tiktok.com/@arieltapiacom"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="text-white/30 hover:text-[#FF5C00] transition-colors"
          >
            <FaTiktok size={24} />
          </a>
        </div>
      </section>

    </main>
  )
}
