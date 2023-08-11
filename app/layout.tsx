import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'
import type { Metadata } from 'next'
import Sidebar from '@/components/Sidebar'


export const metadata: Metadata = {
  title: 'Project Validation Workflow',
  description: 'Workflow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
       <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Sidebar children={children}/>
          </ThemeProvider>
        </body>
    </html>
  )
}
