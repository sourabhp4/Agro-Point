
import { Space_Grotesk } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Provider from '../components/Provider'

import { ThemeProviders } from './theme-providers'

import './globals.css'

import 'css/tailwind.css'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata = {
  title: 'Agri Review Hub',
  description: 'Generated by Sourabh P',
}

export default function RootLayout({ children }) {
  return (
    
  <html
    lang='en'
    className={`${space_grotesk.variable} scroll-smooth`}
    suppressHydrationWarning
  >
    <meta name="msapplication-TileColor" content="#000000" />
    <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
    <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
    <link rel="alternate" type="application/rss+xml" href="/feed.xml" />

    <body className="bg-white text-black antialiased dark:bg-gray-950 dark:text-white" suppressHydrationWarning={true}>
      <Provider>
        <ThemeProviders>
          <section className=''>
            <div className="h-screen font-sans">
              <div className='h-[60vh] w-full absolute top-0 bg-gradient-to-r from-green-200 to-cyan-300 -z-50'></div>
              <Header />
              <main className="mt-24">{ children }</main>
              <Footer />
            </div>
          </section>
        </ThemeProviders>
      </Provider>
    </body>
  </html>
  )
}
