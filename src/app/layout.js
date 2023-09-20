import Navbar from '@/components/Navbar'
import './globals.css'
import { Inter } from 'next/font/google'
import { UserProvider } from '../../firebase/auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ERIER - Fire Tweets',
  description: 'Full Stack Kind a Twitter Clone named "erier" using Firebase and React.js',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  )
}
