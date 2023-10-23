'use client'

import { ThemeProvider } from 'next-themes'

function ThemeProviders({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme='dark' enableSystem>
      {children}
    </ThemeProvider>
  )
}

module.exports = { ThemeProviders }
