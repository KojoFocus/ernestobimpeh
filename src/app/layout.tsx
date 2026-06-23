import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Ernest Obimpeh',
  description: 'Developer. Poet. Beekeeper. Teacher. Builder. Based in Accra, Ghana.',
  openGraph: {
    title: 'Ernest Obimpeh',
    description: 'Developer. Poet. Beekeeper. Teacher. Builder. Based in Accra, Ghana.',
    url: 'https://ernestobimpeh.com',
    siteName: 'Ernest Obimpeh',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
