'use client'

import { useState } from 'react'
import { FaWhatsapp } from 'react-icons/fa6'
import CourseCheckout from '@/components/CourseCheckout'
import MetaPixel from '@/components/MetaPixel'

// URL de embed del VSL (YouTube unlisted)
const VIDEO_URL = 'https://www.youtube.com/embed/XeF0x41l4-M?rel=0&modestbranding=1&playsinline=1&autoplay=1&mute=1'

// Oculto el VSL hasta grabar el video nuevo con el precio actualizado.
// Poner en true para volver a mostrarlo.
const SHOW_VSL = false

const BULLETS = [
  { title: 'Nicho', desc: 'que el que te ve diga "esto es para mí" al instante' },
  { title: 'Ganchos para frenar el scroll', desc: '+ batería de 60 ganchos para copiar' },
  { title: 'Retención y CTA', desc: 'que terminen el video y te escriban' },
  { title: 'Edición paso a paso con CapCut', desc: 'para Instagram y TikTok' },
]

const FAQ = [
  {
    q: '¿Necesito muchos seguidores?',
    a: 'No. El sistema está pensado para que conviertas con lo que ya tenés. Más seguidores no es más clientes.',
  },
  {
    q: '¿Necesito invertir en publicidad?',
    a: 'Para arrancar, no. Es un sistema orgánico: conseguís tus primeros clientes con lo que ya tenés. Si más adelante querés escalar, la pauta es una opción, pero para empezar no la necesitás.',
  },
  {
    q: '¿Sirve si nunca edité un video?',
    a: 'Sí. Los módulos de edición van desde cero con CapCut, paso a paso, para Instagram y TikTok.',
  },
  {
    q: '¿Tengo que saber de marketing?',
    a: 'No. Vos sabés entrenar; yo te doy el sistema para que eso se traduzca en clientes. Lo seguís en orden y listo.',
  },
  {
    q: '¿Cómo accedo después de pagar?',
    a: 'Entrás directo al curso completo con todos los módulos y la batería de ganchos.',
  },
]

function PriceTag({ size = 'lg' }: { size?: 'md' | 'lg' }) {
  const price = size === 'lg' ? 'text-5xl' : 'text-4xl'
  const stroked = size === 'lg' ? 'text-xl' : 'text-lg'
  return (
    <div className="flex items-center justify-center gap-3 flex-wrap">
      <span className={`text-red-600 line-through ${stroked}`}>USD 100</span>
      <span className={`font-serif text-green-600 ${price} font-bold`}>USD 49</span>
      <span className="bg-green-600/10 text-green-700 text-xs font-semibold px-3 py-1 border border-green-600/30 uppercase tracking-widest">
        Ahorrás 51%
      </span>
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-neutral-200">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full text-left py-5 flex items-center justify-between gap-4 text-neutral-900 hover:text-neutral-700 transition-colors"
      >
        <span className="font-semibold text-base sm:text-lg">{q}</span>
        <span
          className={`text-blue-600 text-2xl shrink-0 transition-transform duration-200 ${
            open ? 'rotate-45' : ''
          }`}
          aria-hidden
        >
          +
        </span>
      </button>
      {open && (
        <p className="text-neutral-600 text-sm sm:text-base leading-relaxed pb-5 pr-8">{a}</p>
      )}
    </div>
  )
}

export default function CursoPage() {
  return (
    <main className="bg-slate-200 min-h-screen text-neutral-900 pb-32 sm:pb-16">
      <MetaPixel />

      {/* Card central de ~850px sobre el fondo gris-slate */}
      <div className="mx-auto max-w-[850px] px-3 sm:px-6 py-6 sm:py-10">
        <div className="bg-white shadow-xl rounded-lg px-5 sm:px-10 lg:px-14 py-10 sm:py-14 flex flex-col gap-14 sm:gap-20">

          {/* HEADLINE-GANCHO + VIDEO */}
          <section className="flex flex-col gap-6 sm:gap-8">
            <p className="text-blue-700 text-xs sm:text-sm tracking-[0.3em] uppercase text-center font-semibold">
              Para entrenadores, nutris y coaches
            </p>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-center max-w-3xl mx-auto">
              Copia mi sistema para que tu TikTok e Instagram{' '}
              <span className="text-blue-700">te traigan clientes</span>,{' '}
              sin pauta y sin más seguidores.
            </h1>

            {SHOW_VSL && (
              <>
                <p className="text-neutral-600 text-base sm:text-lg leading-snug text-center max-w-2xl mx-auto">
                  Mirá el video — al terminar vas a tener claro exactamente qué hacer
                  mañana con tu cuenta.
                </p>

                <div className="relative w-full aspect-video bg-neutral-100 border border-neutral-200 overflow-hidden rounded-md shadow-sm">
                  <iframe
                    src={VIDEO_URL}
                    title="De Cero a Clientes en Redes"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </>
            )}
          </section>

          {/* DESCRIPCIÓN — debajo del video */}
          <section className="text-center flex flex-col gap-6">
            <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase">
              De Cero a Clientes en Redes
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold leading-tight max-w-2xl mx-auto">
              El sistema para que tu TikTok e Instagram te traigan clientes,
              aunque tengas pocos seguidores.
            </h2>
            <p className="text-neutral-700 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Para entrenadores, nutris y coaches que saben de lo suyo pero tienen las redes muertas.
              Nicho, ganchos, retención, CTA y edición — paso a paso. Más 60 ganchos listos.
              Conseguís tus primeros clientes con lo que ya tenés, sin
              tener que invertir en pauta para arrancar.
            </p>
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Si tenés clientes presenciales pero tu Instagram parece otra persona, sabés de lo que
              hablo. Conocés tu oficio mejor que la mayoría, pero a la hora de grabar te trabás,
              copiás un reel cualquiera y subís algo con lo que no te identificás. Al día siguiente,
              cero mensajes. Otra semana sin que las redes te traigan un cliente.
            </p>
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Y no es por falta de esfuerzo. Es porque nadie te enseñó a traducir tu oficio al canal
              digital. A ningún entrenador, nutricionista o coach le enseñaron eso en la facultad ni
              en el curso de certificación. Pero es justo lo único que te separa de los colegas que
              sí están facturando online.
            </p>
            <p className="text-neutral-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Esto no es un curso para hacerte viral ni para que copies a un creador random. Es el
              sistema concreto para que lo que ya sabés llegue a la gente correcta, frene el scroll,
              y termine en alguien escribiéndote{' '}
              <span className="text-neutral-900 font-semibold">&ldquo;cuándo arrancamos&rdquo;</span>.
              Sin pauta. Sin reinventarte. Sin más seguidores.
            </p>
          </section>

          {/* BULLETS */}
          <section>
            <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-6 text-center">
              Lo que te llevás
            </p>
            <ul className="flex flex-col gap-4 max-w-xl mx-auto">
              {BULLETS.map((b) => (
                <li key={b.title} className="flex gap-4 items-start">
                  <span className="text-blue-600 mt-1 shrink-0" aria-hidden>→</span>
                  <p className="text-base sm:text-lg leading-relaxed">
                    <span className="font-semibold text-neutral-900">{b.title}:</span>{' '}
                    <span className="text-neutral-600">{b.desc}</span>
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* PRECIO */}
          <section className="flex flex-col items-center gap-4">
            <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase">Acceso al curso</p>
            <PriceTag />
          </section>

          {/* CTA — lleva al único form de pago abajo */}
          <section className="flex justify-center">
            <a
              href="#checkout-final"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base font-semibold py-4 px-8 sm:px-12 uppercase tracking-widest rounded-md shadow-md transition-colors text-center"
            >
              Quiero atraer clientes
            </a>
          </section>

          {/* PARA QUIÉN ES */}
          <section className="text-center flex flex-col gap-4">
            <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase">Para quién es</p>
            <p className="text-neutral-800 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Es para{' '}
              <span className="text-neutral-900 font-semibold">
                entrenadores, nutricionistas o coaches
              </span>{' '}
              que saben de lo suyo y quieren que sus redes les traigan clientes.
            </p>
            <p className="text-neutral-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
              No es para quien busca hacerse viral o juntar seguidores por vanidad.
            </p>
          </section>

          {/* FAQ */}
          <section>
            <p className="text-neutral-500 text-xs tracking-[0.3em] uppercase mb-6 text-center">
              Preguntas frecuentes
            </p>
            <div className="max-w-2xl mx-auto border-t border-neutral-200">
              {FAQ.map((item) => (
                <FaqItem key={item.q} {...item} />
              ))}
            </div>
          </section>

          {/* CHECKOUT — el único form de pago */}
          <section id="checkout-final" className="scroll-mt-8">
            <div className="border border-blue-600/30 bg-blue-50 p-6 sm:p-8 rounded-md flex flex-col gap-6 shadow-sm">
              <h3
                style={{ fontFamily: 'var(--font-days-one)' }}
                className="text-neutral-900 text-3xl text-center leading-tight"
              >
                Solo completa la información abajo y<br className="hidden sm:inline" />{' '}
                obtené acceso inmediato.
              </h3>
              {/* ⬇️ Checkout: add-on (guiones) + embed de Whop ⬇️ */}
              <CourseCheckout />
              <a
                href={`https://wa.me/5492236693894?text=${encodeURIComponent(
                  'Tengo dudas sobre De Cero a Clientes en Redes',
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-500 text-xs sm:text-sm hover:text-neutral-800 transition-colors flex items-center justify-center gap-2"
              >
                <FaWhatsapp size={14} />
                Tengo dudas — escribime por WhatsApp
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* CTA fijo mobile que scrollea al checkout */}
      <a
        href="#checkout"
        className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-blue-600 text-white text-center text-sm font-semibold py-4 px-5 uppercase tracking-widest shadow-[0_-8px_24px_rgba(37,99,235,0.45)]"
      >
        Quiero que mis redes me traigan clientes — USD 49
      </a>
    </main>
  )
}
