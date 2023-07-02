import Navbar from '@/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import Provider from '@/components/Provider'
import { getServerSession } from 'next-auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MindNet',
  description: 'Social app',
}



export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) 
{
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Navbar />
          <main>
            {children}
          </main>
        </Provider>
      </body>
    </html>
  )
}
