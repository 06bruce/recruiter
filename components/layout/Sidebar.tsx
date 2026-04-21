'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useAuth } from '@/lib/authContext'
import { cn } from '@/lib/utils'
import {
  LayoutGrid,
  Users,
  UserCheck,
  MessageSquare,
  LogOut,
  Building2,
  Calendar,
} from 'lucide-react'

const menuItems = [
  { icon: LayoutGrid, label: 'Dashboard', href: '/recruiter/dashboard' },
  { icon: Building2, label: 'Department', href: '/recruiter/departments' },
  { icon: UserCheck, label: 'Candidates', href: '/recruiter/candidates' },
  { icon: Calendar, label: 'Scheduling', href: '/recruiter/scheduling' },
  { icon: MessageSquare, label: 'Message', href: '/recruiter/messages' },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
            <span className="text-white font-bold">R</span>
          </div>
          <span className="text-xl font-bold text-gray-900">RecruitmentIQ</span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition',
                isActive
                  ? 'bg-blue-50 text-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              )}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 transition"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  )
}
