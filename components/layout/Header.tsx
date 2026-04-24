'use client'

import { useAuth } from '@/lib/authContext'
import { roleLabelMap } from '@/lib/mappers'
import { Search, Bell, ChevronRight } from 'lucide-react'

export function Header() {
  const { recruiter } = useAuth()

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Left: Search */}
        <div className="flex-1 max-w-xs">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Right: User & Icons */}
        <div className="flex items-center gap-6 ml-8">
          {/* Bell Icon */}
          <button className="text-gray-600 hover:text-gray-900 transition">
            <Bell size={24} />
          </button>

          {/* User Info */}
          <div className="flex items-center gap-3 pl-6 border-l border-gray-200">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">
                {recruiter?.name || 'User'}
              </p>
              <p className="text-xs text-gray-500">
                {recruiter?.role ? roleLabelMap[recruiter.role] : 'HR Manager'}
              </p>
            </div>
            <button className="flex items-center text-gray-600 hover:text-gray-900 transition">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
