import type { Metadata } from 'next'
import { Inter, Playfair_Display, Days_One } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })
const daysOne = Days_One({ subsets: ['latin'], weight: '400', variable: '--font-days-one' })

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
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","wto5r0581i");`,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${playfair.variable} ${daysOne.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  )
}
