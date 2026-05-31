'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { FaInstagram, FaTiktok, FaWhatsapp } from 'react-icons/fa6'
import PaypalCheckoutButton from '@/components/PaypalCheckoutButton'

type Countdown = { days: number; hours: number; minutes: number; seconds: number }

export default function Home() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [rubro, setRubro] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState<Countdown>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const KEY = 'oferta_expiry'
    let expiry = localStorage.getItem(KEY)
    if (!expiry) {
      const d = new Date()
      d.setDate(d.getDate() + 7)
      expiry = d.toISOString()
      localStorage.setItem(KEY, expiry)
    }
    const tick = () => {
      const diff = new Date(expiry!).getTime() - Date.now()
      if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return }
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

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
              Tenés el oficio. Vender online es la parte que todavía falta.
            </h1>
            <p className="text-white/60 text-base sm:text-lg mt-4 max-w-sm mx-auto">
              Entrenadores, nutricionistas y profesionales del fitness que quieren vender en redes. Sin pauta. Sin imitar a nadie.
            </p>
          </div>
        </div>

        {/* Bottom gradient: smooth transition to dark bg */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0D0D0D] to-transparent z-[5]" />

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
            'Sos entrenador personal, nutricionista o profesional del fitness con años de experiencia cara a cara. Tu techo no es el oficio — es saber cómo venderlo en redes.',
            'En persona cerrás clientes sin problema — o el boca a boca siempre te alcanzó. En digital, no sabés cómo empezar a convertir seguidores en clientes.',
            'Querés sumar el canal online sin abandonar el presencial, pero cada vez que intentás arrancarlo lo terminás postergando otro mes.',
            'Ya intentaste reels, un community manager o un curso online. No funcionó, o nunca llegaste a terminarlo.',
            'Ves colegas con menos certificaciones facturando online lo que vos no lográs tocar. Sabés que el problema no es el oficio.',
          ].map((text, i) => (
            <div key={i} className="flex gap-4 items-start">
              <span className="text-[#FF5C00] mt-0.5 shrink-0">→</span>
              <p className="text-white/70 text-[1.05rem] leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
        <p className="text-white/30 text-sm text-center mt-10 max-w-xs">
          Si leíste eso y sentiste que lo escribí sobre vos, seguí leyendo.
        </p>
      </section>

      {/* Who I am section */}
      <section className="py-20 px-6 flex flex-col items-center border-b border-white/5">
        <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-10">Quién soy</p>
        <div className="grid grid-cols-3 gap-6 sm:gap-12 mb-12 w-full max-w-md text-center">
          <div>
            <p className="font-serif text-[#FF5C00] text-3xl sm:text-4xl font-bold">20</p>
            <p className="text-white/50 text-xs mt-1 leading-snug">años cerrando<br/>cara a cara</p>
          </div>
          <div>
            <p className="font-serif text-[#FF5C00] text-3xl sm:text-4xl font-bold">&lt;/&gt;</p>
            <p className="text-white/50 text-xs mt-1 leading-snug">desarrollo<br/>de software</p>
          </div>
          <div>
            <p className="font-serif text-[#FF5C00] text-3xl sm:text-4xl font-bold">360°</p>
            <p className="text-white/50 text-xs mt-1 leading-snug">cierre<br/>por chat</p>
          </div>
        </div>
        <p className="text-white/60 text-sm sm:text-base text-center max-w-sm leading-relaxed">
          Combiné mostrador, consultorio y llamadas en frío con tecnología para construir un sistema de cierre por chat. No es estrategia de contenido — es venta.
        </p>
      </section>

      {/* Cinematic break */}
      <div className="relative h-[260px] sm:h-[340px] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1400&q=80"
          alt=""
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <p className="font-serif text-white text-2xl sm:text-3xl md:text-4xl font-bold max-w-xl leading-snug">
            Tu oficio vale lo que cobran<br/>los grandes online.
          </p>
          <p className="text-[#FF5C00] font-semibold text-base sm:text-lg mt-3">
            Lo que falta es el sistema para traducirlo.
          </p>
        </div>
      </div>

      {/* Form section */}
      <section className="py-20 px-6 flex flex-col items-center">

        {/* Current focus badge */}
        <div className="flex items-center gap-2 mb-10 px-4 py-2 border border-white/10 bg-white/5">
          <span className="w-2 h-2 rounded-full bg-[#FF5C00] animate-pulse shrink-0" />
          <p className="text-white/60 text-xs">
            Hoy estoy ayudando a{' '}
            <span className="text-white font-medium">entrenadores, nutricionistas y profesionales del fitness</span>
            {' '}a vender digital 1:1
          </p>
        </div>

        {/* Pain points */}
        <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-10">¿Te suena familiar?</p>
        <div className="flex flex-col gap-3 w-full max-w-2xl mb-10">
          {[
            {
              img: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=80',
              title: 'En persona sos otro. Online, la venta no arranca.',
              text: 'Con tus clientes presenciales cerrás sin pensarlo — o el boca a boca siempre te trajo trabajo. En el chat dudás, te freezás, no sabés qué publicar ni cómo convertir un seguidor en una consulta.',
            },
            {
              img: 'https://images.unsplash.com/photo-1758599880935-516d241bc5f3?auto=format&fit=crop&w=800&q=80',
              title: 'Subís reels copiando a alguien con la mitad de tu oficio.',
              text: 'Copiás hooks que viste en Instagram. Al final del día no te reconocés en tu propio contenido. Tenés 20 años de calle y terminás sonando a un pibe de 22 con un trípode.',
            },
            {
              img: 'https://images.unsplash.com/photo-1719239163994-6413670c4e9f?auto=format&fit=crop&w=800&q=80',
              title: 'Colegas con menos oficio facturan lo que vos no lográs tocar.',
              text: 'Menos certificaciones, peor metodología, más facturación online. Sabés que tenés el cuerpo, los años y los clientes que venden. No tenés cómo traducirlo.',
            },
            {
              img: 'https://images.unsplash.com/photo-1584466977773-e625c37cdd50?auto=format&fit=crop&w=800&q=80',
              title: 'Tu techo no es el oficio. Son las horas.',
              text: 'Llegaste a agenda llena por mérito. Pero si te enfermás, no entra. Si tomás vacaciones, no entra. El lumbar te habla hace meses y seguís postergando. Cada mes empieza de cero con la próxima cuota cobrada.',
            },
          ].map((item, i) => (
            <div key={i} className="flex border border-white/10 overflow-hidden">
              <div className="relative w-32 sm:w-44 min-h-[140px] shrink-0">
                <Image src={item.img} alt="" fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40" />
              </div>
              <div className="p-4 sm:p-5 flex flex-col justify-center">
                <p className="text-white font-semibold text-sm mb-2">{item.title}</p>
                <p className="text-white/55 text-sm leading-relaxed">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
        {/* Nutritionist callout */}
        <div className="w-full max-w-2xl mb-10">
          <div className="relative h-52 sm:h-64 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80"
              alt="Nutricionista"
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <p className="text-white/55 text-sm text-center mt-4 leading-relaxed max-w-lg mx-auto">
            ¿Nutricionista, coach de hábitos o profesional de la salud?{' '}
            <span className="text-white/80">El problema de vender online es el mismo. El sistema aplica igual.</span>
          </p>
        </div>

        <p className="text-white/40 text-sm text-center mb-10 max-w-sm">
          Trabajé con entrenadores, nutricionistas y coaches que tenían todo el oficio y no podían replicarlo online.{' '}
          <span className="text-white/60">Ese es exactamente el problema que resuelve la mentoría.</span>
        </p>

        {/* CTA 1 */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mb-20">
          <a href="#contacto" className="flex-1 text-center bg-[#FF5C00] text-white text-sm font-semibold py-3 px-5 hover:bg-[#e05200] transition-colors tracking-widest uppercase">
            Quiero este programa
          </a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center border border-white/20 text-white/60 text-sm font-semibold py-3 px-5 hover:border-white/50 hover:text-white transition-colors flex items-center justify-center gap-2">
            <FaWhatsapp size={15} />
            Escribime por WhatsApp
          </a>
        </div>

        {/* De Cero a Clientes */}
        <div className="w-full max-w-2xl mb-20">
          <div className="border border-[#FF5C00]/40 bg-white/3 px-6 py-8 sm:px-10">
            <div className="flex items-center gap-2 mb-5">
              <span className="text-[#FF5C00] text-xs font-semibold tracking-[0.2em] uppercase">Nuevo</span>
              <span className="w-px h-3 bg-white/20" />
              <span className="text-white/40 text-xs tracking-[0.15em] uppercase">Antes de la mentoría</span>
            </div>
            <h3 className="font-serif text-white text-2xl sm:text-3xl font-bold mb-3 leading-snug">
              De Cero a Clientes
            </h3>
            <p className="text-white/55 text-sm leading-relaxed mb-2 max-w-md">
              Si todavía no tenés presencia digital, este programa te lleva desde cero hasta tu primer cliente online.
              Contenido, audiencia y ventas — paso a paso, antes de encarar la mentoría 1:1.
            </p>
            <p className="text-[#FF5C00]/70 text-xs italic mb-6">
              También viene incluido en el plan base de la mentoría 1:1.
            </p>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-white/30 line-through text-lg">USD 100</span>
              <span className="font-serif text-[#FF5C00] text-3xl font-bold">USD 49</span>
              <span className="bg-[#FF5C00]/15 text-[#FF5C00] text-xs font-semibold px-2 py-0.5 border border-[#FF5C00]/30">
                50% OFF
              </span>
            </div>

            {/* Countdown */}
            <p className="text-white/30 text-xs uppercase tracking-[0.2em] mb-3">Oferta válida por</p>
            <div className="flex gap-3 mb-8">
              {[
                { val: timeLeft.days, label: 'días' },
                { val: timeLeft.hours, label: 'hs' },
                { val: timeLeft.minutes, label: 'min' },
                { val: timeLeft.seconds, label: 'seg' },
              ].map(({ val, label }) => (
                <div key={label} className="flex flex-col items-center w-14 border border-white/10 py-2">
                  <span className="font-serif text-white text-xl font-bold tabular-nums">
                    {String(val).padStart(2, '0')}
                  </span>
                  <span className="text-white/30 text-[10px] uppercase tracking-widest mt-0.5">{label}</span>
                </div>
              ))}
            </div>

            <div className="max-w-sm mb-3">
              <PaypalCheckoutButton />
            </div>
            <a
              href={`https://wa.me/5492236693894?text=${encodeURIComponent('Tengo dudas sobre De Cero a Clientes')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/40 text-xs hover:text-white/70 transition-colors"
            >
              <FaWhatsapp size={12} />
              Tengo dudas — escribime por WhatsApp
            </a>
          </div>
        </div>

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
            { num: '01', title: 'Conexión', desc: 'El primer mensaje no es un pitch — es ganarte el derecho a la siguiente respuesta. Aprendés a abrir conversaciones sin sonar a vendedor.' },
            { num: '02', title: 'Lectura', desc: 'Identificás qué necesita realmente el prospecto antes de ofrecer nada. Acá pierde la venta la mayoría: contestan antes de entender.' },
            { num: '03', title: 'Espejo', desc: 'Le devolvés su propio caso con tus palabras. Cuando se ve representado, deja de comparar y empieza a confiar.' },
            { num: '04', title: 'Cierre', desc: 'El sí no se fuerza, se cosecha. Pedirlo en el momento exacto y con las palabras justas — la diferencia entre "lo pienso" y "cuándo arrancamos".' },
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

        {/* CTA 2 */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mb-20">
          <a href="#contacto" className="flex-1 text-center bg-[#FF5C00] text-white text-sm font-semibold py-3 px-5 hover:bg-[#e05200] transition-colors tracking-widest uppercase">
            Quiero este programa
          </a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center border border-white/20 text-white/60 text-sm font-semibold py-3 px-5 hover:border-white/50 hover:text-white transition-colors flex items-center justify-center gap-2">
            <FaWhatsapp size={15} />
            Escribime por WhatsApp
          </a>
        </div>

        {/* Why 1:1 */}
        <p className="text-white/40 text-xs tracking-[0.3em] uppercase mb-10">Por qué 1:1 y no un curso</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-2xl text-center mb-20">
          {[
            { title: 'Tu contexto, no el genérico', desc: 'No hay dos trainers iguales. Trabajamos con tu perfil, tu ciudad, tus tarifas y tus clientes actuales.' },
            { title: 'Feedback en tiempo real', desc: 'Correcciones sobre tus conversaciones reales, tus publicaciones y tus propuestas. No teoría.' },
            { title: 'Resultado medible', desc: 'Medimos plata en tu cuenta, no likes ni seguidores. El objetivo es que cerrés más ventas — no que termines el módulo 7.' },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-3">
              <div className="w-8 h-px bg-[#FF5C00]" />
              <p className="text-white font-semibold text-base">{item.title}</p>
              <p className="text-white/45 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA 3 */}
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mb-20">
          <a href="#contacto" className="flex-1 text-center bg-[#FF5C00] text-white text-sm font-semibold py-3 px-5 hover:bg-[#e05200] transition-colors tracking-widest uppercase">
            Quiero este programa
          </a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center border border-white/20 text-white/60 text-sm font-semibold py-3 px-5 hover:border-white/50 hover:text-white transition-colors flex items-center justify-center gap-2">
            <FaWhatsapp size={15} />
            Escribime por WhatsApp
          </a>
        </div>

        {/* La promesa */}
        <div className="w-full max-w-lg border border-[#FF5C00]/30 bg-[#FF5C00]/5 px-8 py-8 mb-20 text-center">
          <p className="text-[#FF5C00] text-xs tracking-[0.3em] uppercase mb-4">La promesa</p>
          <p className="font-serif text-white text-2xl sm:text-3xl font-bold leading-snug mb-4">
            USD 10.000 mensuales adicionales en digital — alcanzados en al menos un mes del proceso de 4 meses.
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
          Tus años entrenando a personas no se reemplazan con un trípode.
          La pregunta no es si tenés el oficio para cobrar lo que cobran los grandes online.
          {' '}<span className="text-white/70">La pregunta es si tenés el sistema para traducirlo al canal digital.</span>
        </p>

        {/* Si no tenés contenido — filter block */}
        <div className="w-full max-w-lg border border-[#FF5C00]/40 bg-white/3 px-6 py-7 mb-24 text-center">
          <p className="text-white/40 text-xs tracking-[0.25em] uppercase mb-3">Antes de aplicar</p>
          <p className="text-white font-semibold text-base mb-2">¿Todavía no tenés contenido online?</p>
          <p className="text-white/50 text-sm leading-relaxed mb-2">
            Esta mentoría no es para vos todavía — y eso está bien.
            Tengo un programa previo para que arranques desde cero y llegues listo.
          </p>
          <p className="text-[#FF5C00]/70 text-xs italic mb-5">
            También viene incluido en el plan base de la mentoría 1:1.
          </p>
          {/* Price */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-white/30 line-through text-base">USD 100</span>
            <span className="font-serif text-[#FF5C00] text-4xl font-bold">USD 49</span>
          </div>
          <p className="font-serif text-white text-lg font-semibold mb-5 leading-snug">
            Curso + guía para que tengas todo para arrancar
          </p>
          <div className="max-w-sm mx-auto mb-3">
            <PaypalCheckoutButton />
          </div>
          <a
            href={`https://wa.me/5492236693894?text=${encodeURIComponent('Tengo dudas sobre De Cero a Clientes')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white/40 text-xs hover:text-white/70 transition-colors"
          >
            <FaWhatsapp size={12} />
            Tengo dudas — escribime por WhatsApp
          </a>
        </div>

        {/* Transición — separa visualmente el pago USD 49 del formulario 1:1 */}
        <div className="w-full flex flex-col items-center mb-20">
          <div className="w-10 h-px bg-white/15 mb-12" />
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 mb-8 overflow-hidden rounded-full border border-white/10">
            <Image
              src="/ariel.jpg"
              alt="Ariel Tapia"
              fill
              sizes="(min-width: 640px) 176px, 144px"
              className="object-cover"
            />
          </div>
          <p className="text-[#FF5C00]/70 text-xs tracking-[0.3em] uppercase mb-4">Si ya tenés audiencia</p>
          <p className="font-serif text-white text-2xl sm:text-3xl font-semibold text-center max-w-md leading-snug mb-4">
            Pasemos a hablar 1:1
          </p>
          <p className="text-white/50 text-sm text-center max-w-sm leading-relaxed">
            Lo que sigue es la mentoría 1:1 — no un curso, no un grupo. Vos y yo, sobre tu caso puntual.{' '}
            <span className="text-white/70">El precio se discute en la llamada, no acá.</span>
          </p>
          <div className="w-px h-10 bg-white/15 mt-12 mb-2" />
        </div>

        <p id="contacto" className="text-white/40 text-xs tracking-[0.3em] uppercase mb-4">Aplicar al programa</p>
        <h2 className="font-serif text-white text-3xl sm:text-4xl font-semibold text-center mb-3">
          Pedí tu llamada de calificación
        </h2>
        <p className="text-white/40 text-sm text-center mb-3 max-w-xs">
          30 minutos. Sin compromiso. Vemos si el Sistema 4 Steps aplica a tu situación.
        </p>
        <p className="text-[#FF5C00]/80 text-xs tracking-[0.25em] uppercase text-center mb-10">
          8 entrenadores en simultáneo, máximo
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
              {loading ? 'Enviando...' : 'Quiero este programa'}
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
