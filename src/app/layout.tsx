import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Ariel Tapia | Si sos personal trainer, te ayudo a ganar en redes',
  description:
    'Soy Ariel Tapia. Ayudo a personal trainers a conseguir clientes y vender sus servicios en redes sociales. 20 años en ventas, tecnología y estrategia digital. Trabajemos juntos.',
  keywords: [
    'Ariel Tapia',
    'personal trainer ventas redes',
    'cómo conseguir clientes como personal trainer',
    'vender entrenamiento online',
    'marketing para personal trainers',
    'coach digital fitness',
    'estrategia redes sociales entrenadores',
    'ganar clientes fitness instagram',
  ],
  authors: [{ name: 'Ariel Tapia' }],
  openGraph: {
    title: 'Ariel Tapia | Si sos personal trainer, te ayudo a ganar en redes',
    description:
      'Ayudo a personal trainers a conseguir clientes y vender en redes. Método real, resultados reales. Contactame.',
    url: 'https://arieltapia.com',
    siteName: 'Ariel Tapia',
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ariel Tapia | Si sos personal trainer, te ayudo a ganar en redes',
    description:
      'Ayudo a personal trainers a conseguir clientes y vender en redes. Método real, resultados reales.',
  },
  alternates: {
    canonical: 'https://arieltapia.com',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>{children}</body>
    </html>
  )
}
