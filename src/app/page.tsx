'use client'

import Image from 'next/image'
import { useState } from 'react'
import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa6'

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

  const whatsappUrl = `https://wa.me/5492236693894?text=${encodeURIComponent('Quiero saber más acerca de la mentoría 1:1')}`

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
              Cerrás al 80% en el gym. En el chat, sos otra persona.
            </h1>
            <p className="text-white/60 text-base sm:text-lg mt-4 max-w-sm mx-auto">
              La mentoría 1:1 para entrenadores con agenda llena que no logran cerrar por DM.
            </p>
            <p className="text-white/40 text-sm mt-3 max-w-sm mx-auto">
              Sin reels copiados. Sin pauta. Con el Sistema 4 Steps.
            </p>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="relative z-10 pb-8 flex justify-center">
          <div className="w-px h-10 bg-white/25" />
        </div>
      </section>

      {/* Para quién es esto */}
      <section className="py-20 px-6 flex flex-col items-center border-b border-white/5">
        <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-10">Para quién es esto</p>
        <div className="flex flex-col gap-4 w-full max-w-lg mb-0">
          {[
            'Tenés 5 o más años entrenando y agenda llena. Tu techo no es el oficio — es el tiempo.',
            'Cerrás al 70-90% en el gimnasio y al 0-5% en el chat. Sabés que algo falla, pero no qué.',
            'Ya intentaste reels, un community manager o un curso online. No funcionó.',
            'Ves colegas con menos oficio facturando online lo que vos no lográs tocar. Eso te come por dentro.',
            'Sabés que tenés el cuerpo, los resultados y los años. Lo que no tenés es cómo traducirlo al digital.',
          ].map((text, i) => (
            <div key={i} className="flex gap-4 items-start">
              <span className="text-[#FF5C00] mt-0.5 shrink-0">→</span>
              <p className="text-white/70 text-sm leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
        <p className="text-white/30 text-xs text-center mt-10 max-w-xs">
          Si leíste eso y sentiste que lo escribí sobre vos, seguí leyendo.
        </p>
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

        {/* Pain points */}
        <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-10">¿Te suena familiar?</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mb-10">
          {[
            { icon: '💬', text: 'En el gym cerrás sin problema. Por Instagram te responden "gracias, lo pienso" y desaparecen.' },
            { icon: '📱', text: 'Sabés que tenés que estar en redes pero no sabés qué publicar ni cómo convertir eso en plata.' },
            { icon: '😬', text: 'Te da vergüenza poner el precio. Esperás que el otro lo pida primero.' },
            { icon: '🌐', text: 'Querés dar el salto al digital pero el "¿por dónde empiezo?" te tiene paralizado hace meses.' },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-5 border border-white/10 bg-white/[0.03]">
              <span className="text-2xl shrink-0">{item.icon}</span>
              <p className="text-white/60 text-sm leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="text-white/40 text-sm text-center mb-20 max-w-sm">
          Trabajé con trainers que vendían muy bien en persona y no podían replicarlo online.{' '}
          <span className="text-white/60">Ese es exactamente el problema que resuelve la mentoría.</span>
        </p>

        {/* Benefits */}
        <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-4">La mentoría 1:1</p>
        <h2 className="font-serif text-white text-3xl sm:text-4xl font-semibold text-center mb-3 max-w-md">
          Lo que vas a trabajar conmigo
        </h2>
        <p className="text-white/40 text-sm text-center mb-12 max-w-xs">
          No un curso grabado. No un grupo. Vos y yo, trabajando tu caso puntual.
        </p>
        <div className="flex flex-col gap-8 w-full max-w-lg mb-20">
          {[
            { num: '01', title: 'Cierre en el chat', desc: 'Llevás una conversación de Instagram o WhatsApp desde el primer mensaje hasta el sí. Sin presionar, sin sonar a vendedor.' },
            { num: '02', title: 'Precio sin vergüenza', desc: 'Trabajamos tu relación con el dinero y cómo presentar tus tarifas para que generen confianza, no susto.' },
            { num: '03', title: 'Contenido que atrae clientes', desc: 'Definís qué publicar, cuándo y cómo para que tu perfil haga el trabajo de prospección por vos.' },
            { num: '04', title: 'Tu sistema de ventas digital', desc: 'Construís un proceso repetible: de seguidor a consulta, de consulta a cliente. Sin depender del algoritmo.' },
          ].map((item) => (
            <div key={item.num} className="flex gap-5 items-start">
              <span className="font-serif text-[#FF5C00] text-2xl font-bold shrink-0 w-8">{item.num}</span>
              <div>
                <p className="text-white font-semibold text-base mb-1">{item.title}</p>
                <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Why 1:1 */}
        <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-10">Por qué 1:1 y no un curso</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-2xl text-center mb-20">
          {[
            { title: 'Tu contexto, no el genérico', desc: 'No hay dos trainers iguales. Trabajamos con tu perfil, tu ciudad, tus tarifas y tus clientes actuales.' },
            { title: 'Feedback en tiempo real', desc: 'Correcciones sobre tus conversaciones reales, tus publicaciones y tus propuestas. No teoría.' },
            { title: 'Resultado medible', desc: 'El objetivo es que cerrés más ventas. No que termines el módulo 7. Medimos resultados concretos.' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="w-8 h-px bg-[#FF5C00]" />
              <p className="text-white font-semibold text-base">{item.title}</p>
              <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* La promesa */}
        <div className="w-full max-w-lg border border-[#FF5C00]/30 bg-[#FF5C00]/5 px-8 py-8 mb-20 text-center">
          <p className="text-[#FF5C00] text-xs tracking-[0.3em] uppercase mb-4">La promesa</p>
          <p className="font-serif text-white text-2xl sm:text-3xl font-bold leading-snug mb-4">
            USD 10K mensuales adicionales en digital, en 4 meses.
          </p>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            Sin pauta paga. Sin reinventarte. Sin imitar a nadie.{' '}
            A través del <span className="text-white font-semibold">Sistema 4 Steps</span>:{' '}
            el proceso de cierre por chat construido sobre 20 años de venta cara a cara.
          </p>
          <p className="text-white/30 text-xs">
            El gimnasio sigue. El digital se suma. No tenés que elegir.
          </p>
        </div>

        {/* Identity angle pre-CTA */}
        <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-6">La decisión</p>
        <p className="font-serif text-white text-2xl sm:text-3xl font-semibold text-center mb-5 max-w-md leading-snug">
          Dejá de imitar reels.<br/>Volvé a vender como vos.
        </p>
        <p className="text-white/50 text-sm text-center mb-16 max-w-sm leading-relaxed">
          Tus 20 años de calle no se reemplazan con un trípode.
          La pregunta no es si tenés el oficio para cobrar lo que cobran los grandes online.
          {' '}<span className="text-white/70">La pregunta es si tenés el sistema para traducirlo al canal digital.</span>
        </p>

        <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-4">Aplicar al programa</p>
        <h2 className="font-serif text-white text-3xl sm:text-4xl font-semibold text-center mb-3">
          Pedí tu llamada de calificación
        </h2>
        <p className="text-white/40 text-sm text-center mb-10 max-w-xs">
          30 minutos. Sin compromiso. Vemos si el Sistema 4 Steps aplica a tu situación.
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
              placeholder="¿Cuántos años entrenando? ¿Agenda llena presencial? ¿Qué intentaste en digital hasta ahora?"
              rows={4}
              className="bg-white/5 text-white placeholder-white/25 px-4 py-3 border border-white/10 outline-none focus:border-[#FF5C00] transition text-sm resize-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#FF5C00] text-white text-sm font-semibold py-3 px-6 hover:bg-[#e05200] transition-colors tracking-widest uppercase disabled:opacity-50"
            >
              {loading ? 'Enviando...' : 'Quiero la llamada de calificación'}
            </button>
          </form>
        ) : (
          <p className="text-[#FF5C00] text-base text-center">
            ¡Recibido! Te contacto en las próximas 24hs para coordinar la llamada.
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

      {/* Floating WhatsApp button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white pl-3 pr-4 py-3 rounded-full shadow-lg hover:bg-[#1ebe5d] transition-colors"
      >
        <FaWhatsapp size={22} />
        <span className="text-sm font-semibold">Escribime</span>
      </a>

    </main>
  )
}
