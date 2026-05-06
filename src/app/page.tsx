'use client'

import Image from 'next/image'
import { useState } from 'react'
import { FaInstagram, FaTiktok } from 'react-icons/fa6'

export default function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [rubro, setRubro] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, rubro }),
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
          <span className="text-white text-2xl font-light tracking-[0.35em] uppercase">
            Ariel Tapia
          </span>
        </div>

        {/* Center: phone + title */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center gap-8">

          {/* Phone mockup */}
          <div className="relative w-[208px] h-[416px] sm:w-[247px] sm:h-[494px] bg-black rounded-[47px] border-[9px] border-white/20 shadow-2xl overflow-hidden shrink-0 flex flex-col">
            {/* Dynamic island */}
            <div className="absolute top-[13px] left-1/2 -translate-x-1/2 w-[83px] h-[21px] bg-black rounded-full z-10" />
            <div className="h-[52px] shrink-0" />
            <div className="flex-1 flex items-center justify-center">
              <div className="relative w-full h-[215px] sm:h-[254px]">
                <Image
                  src="/ariel.jpg"
                  alt="Ariel Tapia"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
            <div className="h-[52px] shrink-0" />
          </div>

          {/* Title */}
          <div>
            <div className="flex items-center justify-center gap-2 mb-5">
              <span className="w-2 h-2 rounded-full bg-[#FF5C00] animate-pulse shrink-0" />
              <span className="text-white/50 text-xs tracking-[0.2em] uppercase">Ahora mismo</span>
            </div>
            <h1 className="font-serif text-white text-3xl sm:text-4xl md:text-5xl font-bold leading-tight max-w-xl">
              Ayudando a personal trainers a vender digital 1:1
            </h1>
            <p className="text-white/60 text-base sm:text-lg mt-4 max-w-sm mx-auto">
              Me dedico a potenciar la venta en redes. Sin trucos. Con método.
            </p>
            <p className="text-white/40 text-sm mt-3 max-w-sm mx-auto">
              ¿Sos del rubro? Anotate y te cuento cómo.
            </p>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="relative z-10 pb-8 flex justify-center">
          <div className="w-px h-10 bg-white/25" />
        </div>
      </section>

      {/* Who I am section */}
      <section className="py-20 px-6 flex flex-col items-center border-b border-white/5">
        <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-10">Quién soy</p>
        <div className="grid grid-cols-3 gap-6 sm:gap-12 mb-12 w-full max-w-md text-center">
          <div>
            <p className="font-serif text-[#FF5C00] text-3xl sm:text-4xl font-bold">20</p>
            <p className="text-white/50 text-xs mt-1 leading-snug">años en<br/>ventas</p>
          </div>
          <div>
            <p className="font-serif text-[#FF5C00] text-3xl sm:text-4xl font-bold">&lt;/&gt;</p>
            <p className="text-white/50 text-xs mt-1 leading-snug">desarrollo<br/>de software</p>
          </div>
          <div>
            <p className="font-serif text-[#FF5C00] text-3xl sm:text-4xl font-bold">360°</p>
            <p className="text-white/50 text-xs mt-1 leading-snug">estrategia<br/>en redes</p>
          </div>
        </div>
        <p className="text-white/60 text-sm sm:text-base text-center max-w-sm leading-relaxed">
          Combiné ventas, tecnología y redes para crear un método que realmente funciona en el mundo digital.
        </p>
      </section>

      {/* Form section */}
      <section className="py-20 px-6 flex flex-col items-center">

        {/* Current focus badge */}
        <div className="flex items-center gap-2 mb-10 px-4 py-2 border border-white/10 bg-white/5">
          <span className="w-2 h-2 rounded-full bg-[#FF5C00] animate-pulse shrink-0" />
          <p className="text-white/60 text-xs">
            Hoy estoy ayudando a{' '}
            <span className="text-white font-medium">personal trainers</span>
            {' '}a vender digital 1:1
          </p>
        </div>

        <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-4">Contacto</p>
        <h2 className="font-serif text-white text-3xl sm:text-4xl font-semibold text-center mb-3">
          ¿Trabajamos juntos?
        </h2>
        <p className="text-white/40 text-sm text-center mb-10 max-w-xs">
          Si sos entrenador o tu rubro todavía no está, escribime. Siempre escucho.
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
            <textarea
              value={rubro}
              onChange={(e) => setRubro(e.target.value)}
              placeholder="Contame a qué te dedicás y qué querés lograr..."
              rows={4}
              className="bg-white/5 text-white placeholder-white/25 px-4 py-3 border border-white/10 outline-none focus:border-[#FF5C00] transition text-sm resize-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#FF5C00] text-white text-sm font-semibold py-3 px-6 hover:bg-[#e05200] transition-colors tracking-widest uppercase disabled:opacity-50"
            >
              {loading ? 'Enviando...' : 'Mandame un mensaje'}
            </button>
          </form>
        ) : (
          <p className="text-[#FF5C00] text-base text-center">
            ¡Mensaje recibido! Te respondo a la brevedad.
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
