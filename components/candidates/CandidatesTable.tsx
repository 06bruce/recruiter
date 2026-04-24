'use client'

import { Candidate } from '@/lib/types'
import { Eye } from 'lucide-react'
import Image from 'next/image'

interface CandidatesTableProps {
  candidates: Candidate[]
  onStatusChange: (id: string, status: string) => Promise<void>
  onViewPortfolio: (candidate: Candidate) => void
}

export function CandidatesTable({ candidates, onStatusChange, onViewPortfolio }: CandidatesTableProps) {
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
                <select
                  value={candidate.status}
                  onChange={(e) => void onStatusChange(candidate.id, e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                >
                  <option value="PENDING">Pending</option>
                  <option value="PENDING_INTERVIEW">Pending Interview</option>
                  <option value="ACCEPTED">Accepted</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <button onClick={() => onViewPortfolio(candidate)} className="text-gray-600 hover:text-gray-900 transition flex items-center gap-1">
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
