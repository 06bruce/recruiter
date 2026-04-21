import { Copy } from 'lucide-react'
import { StatCard as StatCardType } from '@/lib/types'

interface StatCardProps {
  stat: StatCardType
}

export function StatCard({ stat }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition">
      {/* Title & Copy Button */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-4xl font-bold text-gray-900">{stat.title}</p>
          <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
        </div>
        <button className="p-2 text-gray-400 hover:text-gray-600 transition">
          <Copy size={18} />
        </button>
      </div>

      {/* Date */}
      <p className="text-xs text-gray-500">{stat.date}</p>
    </div>
  )
}
