'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaWhatsapp, FaInstagram, FaArrowLeft, FaPhone, FaHouse, FaCircleInfo } from 'react-icons/fa6'
import PaypalCheckoutButton from '@/components/PaypalCheckoutButton'

type Answers = {
  // 1-6: calificación
  nombre: string
  email: string
  codigoPais: string
  telefono: string
  instagram: string
  tiktok: string
  profesion: string
  experiencia: string
  clientes: string
  digitalIntent: string[]
  // 7: cliente ideal
  perfil: string
  edad: string
  situacion: string
  // 8: problema y deseo
  dolor: string
  deseo: string
  resultado: string
  indicador: string
  // 9: programa
  plazo: string
  sin: string
  // 10: método
  metodoNombre: string
  metodoDiferenciador: string
  metodoPasos: string
  // 11: entregables
  entregable1: string
  entregable2: string
  entregable3: string
  entregable4: string
  entregable5: string
  // 12: bonos
  bono1: string
  bono2: string
  bono3: string
  // 13: garantía y precio
  garantiaTipo: string
  garantiaDetalle: string
  precioUnico: string
  precioCuotas: string
  // 14: logística
  metodosPago: string
  politicaPrecio: string
  // 15: cierre
  paraQuienNo: string
  proximoPaso: string
  lugares: string
}

const INITIAL: Answers = {
  nombre: '', email: '', codigoPais: '', telefono: '', instagram: '', tiktok: '', profesion: '', experiencia: '', clientes: '', digitalIntent: [],
  perfil: '', edad: '', situacion: '',
  dolor: '', deseo: '', resultado: '', indicador: '',
  plazo: '', sin: '',
  metodoNombre: '', metodoDiferenciador: '', metodoPasos: '',
  entregable1: '', entregable2: '', entregable3: '', entregable4: '', entregable5: '',
  bono1: '', bono2: '', bono3: '',
  garantiaTipo: '', garantiaDetalle: '', precioUnico: '', precioCuotas: '',
  metodosPago: '', politicaPrecio: '',
  paraQuienNo: '', proximoPaso: '', lugares: '',
}

const TOTAL_STEPS = 15
const NUNCA = 'Nunca intenté nada en digital'

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="w-full mb-10">
      <div className="flex justify-between text-white/30 text-sm mb-2">
        <span>Paso {step} de {TOTAL_STEPS}</span>
        <span>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
      </div>
      <div className="h-px bg-white/10 w-full">
        <div className="h-px bg-[#FF5C00] transition-all duration-500" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="text-white/50 text-sm mb-1">{children}</p>
}

function TextInput({ value, onChange, placeholder, onEnter }: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  onEnter?: () => void
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && onEnter?.()}
      placeholder={placeholder}
      className="bg-white/5 text-white text-base placeholder-white/20 px-5 py-3 border border-white/10 outline-none focus:border-[#FF5C00] transition w-full"
    />
  )
}

function TextArea({ value, onChange, placeholder, rows = 3 }: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="bg-white/5 text-white text-base placeholder-white/20 px-5 py-3 border border-white/10 outline-none focus:border-[#FF5C00] transition w-full resize-none"
    />
  )
}

function RadioOption({ value, selected, onSelect, children }: {
  value: string; selected: boolean; onSelect: (v: string) => void; children: React.ReactNode
}) {
  return (
    <button type="button" onClick={() => onSelect(value)}
      className={`w-full text-left px-5 py-4 border text-base transition-all ${selected ? 'border-[#FF5C00] bg-[#FF5C00]/10 text-white' : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white/80'}`}>
      <span className={`mr-3 text-sm ${selected ? 'text-[#FF5C00]' : 'text-white/30'}`}>{selected ? '●' : '○'}</span>
      {children}
    </button>
  )
}

function CheckOption({ value, selected, disabled, onToggle, children }: {
  value: string; selected: boolean; disabled?: boolean; onToggle: (v: string) => void; children: React.ReactNode
}) {
  return (
    <button type="button" onClick={() => !disabled && onToggle(value)}
      className={`w-full text-left px-5 py-4 border text-base transition-all ${disabled ? 'border-white/5 text-white/20 cursor-not-allowed' : selected ? 'border-[#FF5C00] bg-[#FF5C00]/10 text-white' : 'border-white/10 text-white/60 hover:border-white/30 hover:text-white/80'}`}>
      <span className={`mr-3 text-sm ${disabled ? 'text-white/15' : selected ? 'text-[#FF5C00]' : 'text-white/30'}`}>{selected ? '■' : '□'}</span>
      {children}
    </button>
  )
}

function StepHeader({ n, title, sub }: { n: number; title: string; sub?: string }) {
  return (
    <div className="mb-6">
      <p className="text-white/40 text-sm tracking-[0.25em] uppercase mb-3">Paso {n}</p>
      <h2 className="font-serif text-white text-3xl sm:text-4xl font-bold mb-2 leading-snug">{title}</h2>
      {sub && <p className="text-white/35 text-base">{sub}</p>}
    </div>
  )
}

export default function OfertaPage() {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<Answers>(INITIAL)
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [gated, setGated] = useState(false)
  const [activeBubble, setActiveBubble] = useState<'phone' | 'info' | 'home' | null>(null)
  const [loaded, setLoaded] = useState(false)

  const STORAGE_KEY = 'oferta_draft'

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const { step: s, answers: a } = JSON.parse(saved)
        if (s) setStep(s)
        if (a) setAnswers(a)
      }
    } catch {}
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ step, answers }))
    } catch {}
  }, [step, answers, loaded])

  const openBubble = (b: 'phone' | 'info' | 'home') => {
    setActiveBubble(b)
    setTimeout(() => setActiveBubble(null), 3000)
  }

  const set = <K extends keyof Answers>(key: K, val: Answers[K]) =>
    setAnswers((prev) => ({ ...prev, [key]: val }))

  const toggleDigital = (val: string) => {
    setAnswers((prev) => {
      if (prev.digitalIntent.includes(val)) {
        return { ...prev, digitalIntent: prev.digitalIntent.filter((v) => v !== val) }
      }
      const next = val === NUNCA ? [NUNCA] : prev.digitalIntent.filter((v) => v !== NUNCA).concat(val)
      return { ...prev, digitalIntent: next }
    })
  }

  const canAdvance = (): boolean => {
    const a = answers
    if (step === 1) return a.nombre.trim().length > 1
    if (step === 2) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a.email)
    if (step === 3) return a.profesion !== ''
    if (step === 4) return a.experiencia !== ''
    if (step === 5) return a.clientes !== ''
    if (step === 6) return a.digitalIntent.length > 0
    if (step === 7) return a.perfil.trim() !== '' && a.edad.trim() !== '' && a.situacion.trim() !== ''
    if (step === 8) return a.dolor.trim() !== '' && a.deseo.trim() !== '' && a.resultado.trim() !== '' && a.indicador.trim() !== ''
    if (step === 9) return a.plazo !== '' && a.sin.trim() !== ''
    if (step === 10) return a.metodoNombre.trim() !== '' && a.metodoDiferenciador.trim() !== '' && a.metodoPasos.trim() !== ''
    if (step === 11) return a.entregable1.trim() !== '' && a.entregable2.trim() !== '' && a.entregable3.trim() !== ''
    if (step === 12) return a.bono1.trim() !== '' && a.bono2.trim() !== ''
    if (step === 13) return a.garantiaTipo !== '' && (a.garantiaTipo === 'Sin garantía' || a.garantiaDetalle.trim() !== '') && a.precioUnico.trim() !== ''
    if (step === 14) return a.metodosPago.trim() !== '' && a.politicaPrecio.trim() !== ''
    if (step === 15) return a.paraQuienNo.trim() !== '' && a.proximoPaso.trim() !== '' && a.lugares.trim() !== ''
    return true
  }

  const next = () => {
    if (!canAdvance()) return
    if (step === 6 && answers.digitalIntent.includes(NUNCA)) { setGated(true); return }
    if (step < TOTAL_STEPS) setStep((s) => s + 1)
    else handleSubmit()
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    try {
      const a = answers
      const formattedAnswers: Record<string, string> = {
        ...(a.telefono ? { 'Teléfono': `+${a.codigoPais} ${a.telefono}`.trim() } : {}),
        ...(a.instagram ? { 'Instagram': `@${a.instagram}` } : {}),
        ...(a.tiktok ? { 'TikTok': `@${a.tiktok}` } : {}),
        '¿A qué te dedicás?': a.profesion,
        '¿Cuántos años de experiencia?': a.experiencia,
        '¿Cómo conseguís clientes hoy?': a.clientes,
        '¿Qué intentaste en digital?': a.digitalIntent.join(', ') || '—',
        'Perfil del cliente ideal': a.perfil,
        'Edad / rango etario del cliente': a.edad,
        'Situación de vida concreta': a.situacion,
        'Dolor que más arde': a.dolor,
        'Deseo que más tira': a.deseo,
        'Resultado en una frase': a.resultado,
        'Indicador principal de éxito': a.indicador,
        'Plazo del programa': a.plazo,
        'El "sin" (qué no le pedís que haga)': a.sin,
        'Nombre del método': a.metodoNombre,
        'Diferenciador del enfoque': a.metodoDiferenciador,
        'Las 3 fases o pasos': a.metodoPasos,
        'Entregable 1': a.entregable1,
        'Entregable 2': a.entregable2,
        'Entregable 3': a.entregable3,
        ...(a.entregable4 ? { 'Entregable 4': a.entregable4 } : {}),
        ...(a.entregable5 ? { 'Entregable 5': a.entregable5 } : {}),
        'Bono 1': a.bono1,
        'Bono 2': a.bono2,
        ...(a.bono3 ? { 'Bono 3': a.bono3 } : {}),
        'Tipo de garantía': a.garantiaTipo,
        'Qué devolvés / qué ofrecés': a.garantiaDetalle,
        'Precio pago único': a.precioUnico,
        ...(a.precioCuotas ? { 'Plan de cuotas': a.precioCuotas } : {}),
        'Métodos de pago': a.metodosPago,
        'Política de precio': a.politicaPrecio,
        'Para quién NO es': a.paraQuienNo,
        'Próximo paso para entrar': a.proximoPaso,
        'Lugares disponibles / apertura': a.lugares,
      }
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: a.nombre, email: a.email, answers: formattedAnswers, source: 'oferta' }),
      })
      if (!res.ok) throw new Error('error')
      localStorage.removeItem(STORAGE_KEY)
      setSubmitted(true)
    } catch {
      setError('Algo salió mal. Escribime por WhatsApp directamente.')
    } finally {
      setLoading(false)
    }
  }

  if (gated) {
    return (
      <main className="bg-[#0D0D0D] min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="w-8 h-px bg-white/20 mb-8" />
        <p className="text-white/40 text-base tracking-[0.3em] uppercase mb-5">Un momento</p>
        <h2 className="font-serif text-white text-4xl sm:text-5xl font-bold mb-6 max-w-md leading-snug">
          Esta mentoría no es para vos todavía.
        </h2>
        <p className="text-white/50 text-lg leading-relaxed mb-8 max-w-md">
          Sin contenido publicado, todavía no tenés la base para aprovechar el programa 1:1.
          Pero tengo un curso previo, súper accesible, que te lleva de cero a tu primera presencia digital.
        </p>
        <div className="mb-7 text-center border border-[#FF5C00]/40 px-8 py-5 max-w-sm">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-white/30 line-through text-lg">USD 100</span>
            <span className="font-serif text-[#FF5C00] text-4xl font-bold">USD 49</span>
          </div>
          <p className="text-white/60 text-base leading-relaxed">
            Curso + 30 días de guiones adaptados a tu oferta
          </p>
        </div>
        <div className="w-full max-w-sm mb-4">
          <PaypalCheckoutButton />
        </div>
        <a href={`https://wa.me/5492236693894?text=${encodeURIComponent('Tengo dudas sobre De Cero a Clientes')}`}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-white/40 text-sm hover:text-white/70 transition-colors mb-6">
          <FaWhatsapp size={14} />Tengo dudas — escribime por WhatsApp
        </a>
        <button type="button" onClick={() => { setGated(false); setStep(7) }}
          className="text-white/25 text-base hover:text-white/50 transition-colors">
          Igual quiero continuar con el formulario →
        </button>
      </main>
    )
  }

  if (submitted) {
    return (
      <main className="bg-[#0D0D0D] min-h-screen flex flex-col items-center justify-center px-6 py-16 text-center">
        <div className="w-8 h-px bg-[#FF5C00] mb-8" />
        <p className="text-white/40 text-sm tracking-[0.3em] uppercase mb-4">¡Listo!</p>
        <h1 className="font-serif text-white text-4xl sm:text-5xl font-bold mb-5 max-w-sm leading-snug">Recibí tu respuesta.</h1>
        <p className="text-white/55 text-base leading-relaxed mb-10 max-w-sm">
          Te contacto en las próximas 24hs para coordinar la llamada. Si querés hablar antes, escribime directo.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
          <a href="https://www.instagram.com/arieltapiacom" target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#FF5C00] text-white text-base font-semibold py-3 px-5 hover:bg-[#e05200] transition-colors tracking-widest uppercase">
            <FaInstagram size={17} />DM en Instagram
          </a>
          <a href={`https://wa.me/5492236693894?text=${encodeURIComponent('¡Mandé mi formulario de calificación!')}`}
            target="_blank" rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 border border-white/20 text-white/60 text-base font-semibold py-3 px-5 hover:border-white/50 hover:text-white transition-colors">
            <FaWhatsapp size={17} />WhatsApp
          </a>
        </div>
        <Link href="/" className="text-white/25 text-sm mt-10 hover:text-white/50 transition-colors">← Volver al inicio</Link>
      </main>
    )
  }

  return (
    <main className="bg-[#0D0D0D] min-h-screen">
      <div className="flex flex-col items-center px-6 lg:px-[10%] py-12 max-w-[1280px] mx-auto">

        {/* Header */}
        <div className="w-full flex items-center justify-between mb-12">
          {step > 1
            ? <button type="button" onClick={() => setStep(s => s - 1)} className="text-white/30 hover:text-white/60 transition-colors"><FaArrowLeft size={18} /></button>
            : <Link href="/" className="text-white/30 hover:text-white/60 transition-colors"><FaArrowLeft size={18} /></Link>
          }
          <span className="text-white text-base font-light tracking-[0.3em] uppercase">Ariel Tapia</span>
          <div className="w-5" />
        </div>

        <ProgressBar step={step} />

        {/* Mobile bubble navbar — below progress bar, step 7+ */}
        {step >= 7 && (
          <div className="lg:hidden w-full mb-6">
            <div className="flex items-center gap-3">
              {step >= 10 && (
                <button type="button" onClick={() => openBubble('phone')}
                  className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors ${activeBubble === 'phone' ? 'border-[#FF5C00] bg-[#FF5C00]/15' : 'border-[#FF5C00]/30 bg-white/5'}`}>
                  <FaPhone size={13} className="text-[#FF5C00]/80" />
                </button>
              )}
              <button type="button" onClick={() => openBubble('info')}
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors ${activeBubble === 'info' ? 'border-[#FF5C00] bg-[#FF5C00]/15' : 'border-[#FF5C00]/30 bg-white/5'}`}>
                <FaCircleInfo size={13} className="text-[#FF5C00]/80" />
              </button>
              <button type="button" onClick={() => openBubble('home')}
                className={`w-9 h-9 rounded-full flex items-center justify-center border transition-colors ${activeBubble === 'home' ? 'border-white/40 bg-white/10' : 'border-white/15 bg-white/5'}`}>
                <FaHouse size={13} className="text-white/40" />
              </button>
            </div>
            {activeBubble === 'phone' && (
              <div className="mt-2 border border-[#FF5C00]/30 bg-[#0D0D0D] px-4 py-3">
                <p className="text-white/60 text-sm leading-relaxed">
                  Si tenés dudas o dejás algo sin completar lo hacemos en nuestra primera llamada.
                </p>
              </div>
            )}
            {activeBubble === 'info' && (
              <div className="mt-2 border border-[#FF5C00]/30 bg-[#0D0D0D] px-4 py-3">
                <p className="text-white/60 text-sm leading-relaxed">
                  Si se te cerró la página podés continuar desde donde lo dejaste en{' '}
                  <span className="text-[#FF5C00]/80">arieltapia.com/oferta</span>
                </p>
              </div>
            )}
            {activeBubble === 'home' && (
              <div className="mt-2 border border-white/10 bg-[#0D0D0D] px-4 py-3">
                <Link href="/" className="text-white/50 text-sm">← Home</Link>
              </div>
            )}
          </div>
        )}

        <div className="w-full">

          {step === 1 && (
            <div className="flex flex-col gap-6">
              <StepHeader n={1} title="¿Cómo te llamás?" />
              <TextInput value={answers.nombre} onChange={(v) => set('nombre', v)} placeholder="Tu nombre" onEnter={next} />
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-6">
              <StepHeader n={2} title="¿Cómo te contactamos?" sub="El email es obligatorio, el resto opcional." />
              <div className="flex flex-col gap-4">
                <div>
                  <Label>Email</Label>
                  <TextInput value={answers.email} onChange={(v) => set('email', v)} placeholder="tu@email.com" onEnter={next} />
                </div>
                <div>
                  <Label>Teléfono <span className="text-white/25">(opcional)</span></Label>
                  <div className="flex">
                    <span className="bg-white/5 border border-r-0 border-white/10 px-4 flex items-center text-white/50 text-base shrink-0">+</span>
                    <input
                      type="tel"
                      value={answers.codigoPais}
                      onChange={(e) => set('codigoPais', e.target.value)}
                      placeholder="54"
                      className="w-20 bg-white/5 text-white text-base placeholder-white/20 px-3 py-3 border border-r-0 border-white/10 outline-none focus:border-[#FF5C00] transition text-center"
                    />
                    <input
                      type="tel"
                      value={answers.telefono}
                      onChange={(e) => set('telefono', e.target.value)}
                      placeholder="9 11 1234 5678"
                      className="flex-1 bg-white/5 text-white text-base placeholder-white/20 px-4 py-3 border border-white/10 outline-none focus:border-[#FF5C00] transition"
                    />
                  </div>
                </div>
                <div>
                  <Label>Instagram <span className="text-white/25">(opcional)</span></Label>
                  <div className="flex">
                    <span className="bg-white/5 border border-r-0 border-white/10 px-4 flex items-center text-white/50 text-base">@</span>
                    <input
                      type="text"
                      value={answers.instagram}
                      onChange={(e) => set('instagram', e.target.value)}
                      placeholder="usuario"
                      className="flex-1 bg-white/5 text-white text-base placeholder-white/20 px-4 py-3 border border-white/10 outline-none focus:border-[#FF5C00] transition"
                    />
                  </div>
                </div>
                <div>
                  <Label>TikTok <span className="text-white/25">(opcional)</span></Label>
                  <div className="flex">
                    <span className="bg-white/5 border border-r-0 border-white/10 px-4 flex items-center text-white/50 text-base">@</span>
                    <input
                      type="text"
                      value={answers.tiktok}
                      onChange={(e) => set('tiktok', e.target.value)}
                      placeholder="usuario"
                      className="flex-1 bg-white/5 text-white text-base placeholder-white/20 px-4 py-3 border border-white/10 outline-none focus:border-[#FF5C00] transition"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-6">
              <StepHeader n={3} title="¿A qué te dedicás?" />
              <div className="flex flex-col gap-2">
                {['Entrenador personal', 'Nutricionista', 'Coach de hábitos / bienestar', 'Fisioterapeuta / kinesiólogo', 'Otro profesional del fitness o salud'].map((opt) => (
                  <RadioOption key={opt} value={opt} selected={answers.profesion === opt} onSelect={(v) => set('profesion', v)}>{opt}</RadioOption>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col gap-6">
              <StepHeader n={4} title="¿Cuántos años de experiencia tenés?" />
              <div className="flex flex-col gap-2">
                {['Menos de 2 años', 'De 2 a 5 años', 'De 5 a 10 años', 'Más de 10 años'].map((opt) => (
                  <RadioOption key={opt} value={opt} selected={answers.experiencia === opt} onSelect={(v) => set('experiencia', v)}>{opt}</RadioOption>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="flex flex-col gap-6">
              <StepHeader n={5} title="¿Cómo conseguís clientes hoy?" />
              <div className="flex flex-col gap-2">
                {['Solo presencial — boca a boca, referidos', 'Mezclo presencial y algunas consultas online', 'Principalmente online', 'Todavía estoy buscando mis primeros clientes'].map((opt) => (
                  <RadioOption key={opt} value={opt} selected={answers.clientes === opt} onSelect={(v) => set('clientes', v)}>{opt}</RadioOption>
                ))}
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="flex flex-col gap-6">
              <StepHeader n={6} title="¿Qué intentaste en digital hasta ahora?" sub="Podés elegir más de una opción." />
              <div className="flex flex-col gap-2">
                {[NUNCA, 'Publiqué reels o stories', 'Contraté un community manager', 'Hice un curso o programa online', 'Intenté varias cosas y ninguna funcionó'].map((opt) => (
                  <CheckOption key={opt} value={opt}
                    selected={answers.digitalIntent.includes(opt)}
                    disabled={opt !== NUNCA && answers.digitalIntent.includes(NUNCA)}
                    onToggle={toggleDigital}>{opt}</CheckOption>
                ))}
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-3 border border-[#FF5C00]/40 bg-[#FF5C00]/8 px-5 py-4">
                <span className="text-[#FF5C00] text-lg shrink-0 mt-0.5">→</span>
                <p className="text-white font-semibold text-base leading-snug">
                  La información siguiente es crucial para entender en dónde estás parado hoy.
                </p>
              </div>
              <StepHeader n={7} title="Tu cliente ideal" sub="Describí a la persona que querés ayudar." />
              <div className="flex flex-col gap-4">
                <div>
                  <Label>Perfil en una frase <span className="text-white/30 text-xs">(ej: Hombre de 40+, sedentario con dolor lumbar…)</span></Label>
                  <TextInput value={answers.perfil} onChange={(v) => set('perfil', v)} placeholder="Describí a tu cliente ideal en una frase" />
                </div>
                <div>
                  <Label>Edad / rango etario</Label>
                  <TextInput value={answers.edad} onChange={(v) => set('edad', v)} placeholder="Ej: 35-55 años" />
                </div>
                <div>
                  <Label>Situación de vida concreta</Label>
                  <TextArea value={answers.situacion} onChange={(v) => set('situacion', v)} placeholder="¿En qué momento de su vida está? ¿Qué está viviendo?" />
                </div>
              </div>
            </div>
          )}

          {step === 8 && (
            <div className="flex flex-col gap-6">
              <StepHeader n={8} title="Problema, deseo y resultado" sub="(Seguimos hablando de tu cliente ideal)" />
              <div className="flex flex-col gap-4">
                <div>
                  <Label>Dolor que más arde</Label>
                  <TextArea value={answers.dolor} onChange={(v) => set('dolor', v)} placeholder="¿Qué problema concreto le quita el sueño?" />
                </div>
                <div>
                  <Label>Deseo que más tira</Label>
                  <TextArea value={answers.deseo} onChange={(v) => set('deseo', v)} placeholder="¿Qué quiere lograr más que nada?" />
                </div>
                <div>
                  <Label>Resultado en una frase</Label>
                  <TextInput value={answers.resultado} onChange={(v) => set('resultado', v)} placeholder="Ej: Perder 10kg sin dieta restrictiva en 90 días" />
                </div>
                <div>
                  <Label>Indicador principal de éxito</Label>
                  <TextInput value={answers.indicador} onChange={(v) => set('indicador', v)} placeholder="¿Cómo saben que el programa funcionó?" />
                </div>
              </div>
            </div>
          )}

          {step === 9 && (
            <div className="flex flex-col gap-6">
              <StepHeader n={9} title="Tu programa" />
              <div className="flex flex-col gap-4">
                <div>
                  <Label>Plazo del programa</Label>
                  <div className="flex flex-col gap-2 mt-2">
                    {['4 semanas', '6 semanas', '8 semanas', '12 semanas', '16 semanas', '6 meses', 'Otro'].map((opt) => (
                      <RadioOption key={opt} value={opt} selected={answers.plazo === opt} onSelect={(v) => set('plazo', v)}>{opt}</RadioOption>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>El "sin" — qué no le vas a pedir que haga</Label>
                  <TextArea value={answers.sin} onChange={(v) => set('sin', v)} placeholder="Ej: Sin dietas extremas, sin cirugías, sin dejar de comer lo que te gusta…" />
                </div>
              </div>
            </div>
          )}

          {step === 10 && (
            <div className="flex flex-col gap-6">
              <p className="text-white/45 text-sm italic">Ya falta menos, te prometo que esto sirve para ayudarte mejor.</p>
              <StepHeader n={10} title="Tu método" />
              <div className="flex flex-col gap-4">
                <div>
                  <Label>Nombre de tu método o sistema</Label>
                  <TextInput value={answers.metodoNombre} onChange={(v) => set('metodoNombre', v)} placeholder="Ej: Método Reset, Sistema 4 Steps…" />
                </div>
                <div>
                  <Label>En qué se diferencia del enfoque típico</Label>
                  <TextArea value={answers.metodoDiferenciador} onChange={(v) => set('metodoDiferenciador', v)} placeholder="¿Por qué tu método funciona cuando los otros fallan?" />
                </div>
                <div>
                  <Label>Las 3 fases o pasos de tu método</Label>
                  <TextArea value={answers.metodoPasos} onChange={(v) => set('metodoPasos', v)} placeholder="Fase 1: … / Fase 2: … / Fase 3: …" rows={4} />
                </div>
              </div>
            </div>
          )}

          {step === 11 && (
            <div className="flex flex-col gap-6">
              <StepHeader n={11} title="Entregables" sub="¿Qué recibe exactamente quien entra al programa?" />
              <div className="flex flex-col gap-4">
                {([
                  { key: 'entregable1', label: 'Entregable 1 — el núcleo', required: true },
                  { key: 'entregable2', label: 'Entregable 2', required: true },
                  { key: 'entregable3', label: 'Entregable 3', required: true },
                  { key: 'entregable4', label: 'Entregable 4', required: false },
                  { key: 'entregable5', label: 'Entregable 5', required: false },
                ] as const).map(({ key, label, required }, i) => (
                  <div key={key}>
                    <Label>{label} {!required && <span className="text-white/25">(opcional)</span>}</Label>
                    <TextInput value={answers[key]} onChange={(v) => set(key, v)} placeholder={[
                      'Ej: 8 sesiones 1:1 semanales por videollamada de 60 min',
                      'Ej: Plan de entrenamiento personalizado actualizado cada 2 semanas',
                      'Ej: Acceso a grupo privado de WhatsApp con respuesta en menos de 24hs',
                      'Ej: Auditoría de tu perfil de Instagram con correcciones puntuales',
                      'Ej: Plantillas de cierre de ventas por chat listas para usar',
                    ][i]} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 12 && (
            <div className="flex flex-col gap-6">
              <StepHeader n={12} title="Bonos" sub="¿Qué objeción mata cada bono?" />
              <div className="flex flex-col gap-4">
                {([
                  { key: 'bono1', label: 'Bono 1 — nombre y qué objeción mata', required: true },
                  { key: 'bono2', label: 'Bono 2 — nombre y qué objeción mata', required: true },
                  { key: 'bono3', label: 'Bono 3', required: false },
                ] as const).map(({ key, label, required }) => (
                  <div key={key}>
                    <Label>{label} {!required && <span className="text-white/25">(opcional)</span>}</Label>
                    <TextInput value={answers[key]} onChange={(v) => set(key, v)} placeholder="Ej: Guía de recetas rápidas — elimina la objeción 'no tengo tiempo'" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 13 && (
            <div className="flex flex-col gap-6">
              <StepHeader n={13} title="Garantía y precio" />
              <div className="flex flex-col gap-4">
                <div>
                  <Label>Tipo de garantía</Label>
                  <div className="flex flex-col gap-2 mt-2">
                    {['Sin garantía', 'Garantía de 30 días', 'Garantía de 60 días', 'Garantía de resultado al final del programa', 'Personalizada'].map((opt) => (
                      <RadioOption key={opt} value={opt} selected={answers.garantiaTipo === opt} onSelect={(v) => set('garantiaTipo', v)}>{opt}</RadioOption>
                    ))}
                  </div>
                </div>
                {answers.garantiaTipo !== 'Sin garantía' && (
                  <div>
                    <Label>Qué devolvés o qué ofrecés</Label>
                    <TextArea value={answers.garantiaDetalle} onChange={(v) => set('garantiaDetalle', v)} placeholder="Describí exactamente qué pasa si el cliente pide la garantía" />
                  </div>
                )}
                <div>
                  <Label>Precio pago único</Label>
                  <TextInput value={answers.precioUnico} onChange={(v) => set('precioUnico', v)} placeholder="Ej: USD 1500" />
                </div>
                <div>
                  <Label>Plan de cuotas <span className="text-white/25">(opcional)</span></Label>
                  <TextInput value={answers.precioCuotas} onChange={(v) => set('precioCuotas', v)} placeholder="Ej: 3 cuotas de USD 550" />
                </div>
              </div>
            </div>
          )}

          {step === 14 && (
            <div className="flex flex-col gap-6">
              <StepHeader n={14} title="Logística de pago" />
              <div className="flex flex-col gap-4">
                <div>
                  <Label>Métodos de pago aceptados</Label>
                  <TextArea value={answers.metodosPago} onChange={(v) => set('metodosPago', v)} placeholder="Ej: Transferencia bancaria, Mercado Pago, PayPal, crypto…" />
                </div>
                <div>
                  <Label>Política de precio</Label>
                  <TextArea value={answers.politicaPrecio} onChange={(v) => set('politicaPrecio', v)} placeholder="¿Hacés descuentos? ¿El precio sube? ¿Hay bonificaciones por tiempo?" />
                </div>
              </div>
            </div>
          )}

          {step === 15 && (
            <div className="flex flex-col gap-6">
              <StepHeader n={15} title="Para cerrar" />
              <div className="flex flex-col gap-4">
                <div>
                  <Label>Para quién NO es — 3 criterios de descarte</Label>
                  <TextArea value={answers.paraQuienNo} onChange={(v) => set('paraQuienNo', v)} placeholder="Ej: No es para alguien que busca resultados en 1 semana / No es para quién no puede comprometerse / …" rows={4} />
                </div>
                <div>
                  <Label>Próximo paso para entrar al programa</Label>
                  <TextInput value={answers.proximoPaso} onChange={(v) => set('proximoPaso', v)} placeholder="Ej: Llamada de 30 min, DM por Instagram, formulario de aplicación…" />
                </div>
                <div>
                  <Label>Lugares disponibles y apertura</Label>
                  <TextInput value={answers.lugares} onChange={(v) => set('lugares', v)} placeholder="Ej: 5 lugares disponibles, apertura el 1 de julio" />
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10">
            {step > 1
              ? <button type="button" onClick={() => setStep((s) => s - 1)}
                  className="text-white/35 text-base hover:text-white/60 transition-colors flex items-center gap-2">
                  <FaArrowLeft size={14} />Atrás
                </button>
              : <div />
            }
            <button type="button" onClick={next} disabled={!canAdvance() || loading}
              className="bg-[#FF5C00] text-white text-base font-semibold py-3 px-8 hover:bg-[#e05200] transition-colors tracking-widest uppercase disabled:opacity-30 disabled:cursor-not-allowed">
              {loading ? 'Enviando...' : step === TOTAL_STEPS ? 'Enviar' : 'Siguiente →'}
            </button>
          </div>

          {error && <p className="text-red-400 text-base text-center mt-4">{error}</p>}

        </div>

      </div>

      {/* Desktop only: fixed bottom-right cards */}
      {step >= 7 && (
        <div className="hidden lg:flex fixed bottom-5 right-5 flex-col gap-2 max-w-[240px]">
          {step >= 10 && (
            <div className="border border-[#FF5C00]/30 bg-[#0D0D0D]/90 px-4 py-3">
              <div className="flex items-start gap-2">
                <FaPhone size={13} className="text-[#FF5C00]/70 shrink-0 mt-0.5" />
                <p className="text-white/60 text-sm leading-relaxed">
                  Si tenés dudas o dejás algo sin completar lo hacemos en nuestra primera llamada.
                </p>
              </div>
            </div>
          )}
          <div className="border border-[#FF5C00]/30 bg-[#0D0D0D]/90 px-4 py-3">
            <p className="text-white/60 text-sm leading-relaxed">
              Si se te cerró la página podés continuar desde donde lo dejaste en{' '}
              <span className="text-[#FF5C00]/80">arieltapia.com/oferta</span>
            </p>
          </div>
          <Link href="/" className="border border-white/10 bg-[#0D0D0D]/90 px-4 py-3 text-white/40 text-sm hover:text-white/70 transition-colors text-center">
            ← Home
          </Link>
        </div>
      )}

    </main>
  )
}
