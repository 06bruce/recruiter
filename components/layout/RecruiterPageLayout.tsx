'use client'

import { Sidebar } from './Sidebar'
import { Header } from './Header'

interface RecruiterPageLayoutProps {
  children: React.ReactNode
}

export function RecruiterPageLayout({ children }: RecruiterPageLayoutProps) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
