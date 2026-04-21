'use client'

import { Candidate } from '@/lib/types'
import { Eye } from 'lucide-react'
import Image from 'next/image'

interface CandidatesTableProps {
  candidates: Candidate[]
}

export function CandidatesTable({ candidates }: CandidatesTableProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="px-6 py-4 text-left text-sm font-semibold">Nama</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Departemen</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Posisi</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Waktu / Date</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
            <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {candidates.map((candidate) => (
            <tr key={candidate.id} className="hover:bg-gray-50 transition">
              {/* Name & Avatar */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                    <img
                      src={candidate.avatar}
                      alt={candidate.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-medium text-gray-900">{candidate.name}</span>
                </div>
              </td>

              {/* Department */}
              <td className="px-6 py-4 text-gray-600">{candidate.department}</td>

              {/* Position */}
              <td className="px-6 py-4 text-gray-600">{candidate.position}</td>

              {/* DateTime */}
              <td className="px-6 py-4 text-gray-600 text-sm">{candidate.dateTime}</td>

              {/* Status */}
              <td className="px-6 py-4">
                <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                  {candidate.status === 'Pending Interview' && '• Pending Interview'}
                  {candidate.status === 'Accepted' && '• Accepted'}
                  {candidate.status === 'Rejected' && '• Rejected'}
                </span>
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <button className="text-gray-600 hover:text-gray-900 transition flex items-center gap-1">
                    <Eye size={18} />
                    <span className="text-sm hidden sm:inline">Lihat Portfolio</span>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
