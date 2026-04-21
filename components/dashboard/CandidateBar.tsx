'use client'

import { Candidate } from '@/lib/types'

interface CandidateBarProps {
  candidate: Candidate
  onSelect: (candidate: Candidate) => void
}

export function CandidateBar({ candidate, onSelect }: CandidateBarProps) {
  return (
    <div
      onClick={() => onSelect(candidate)}
      className="cursor-pointer group mb-4 p-4 rounded-lg border border-gray-200 hover:border-blue-400 hover:bg-blue-50 transition-all"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition">
          {candidate.name}
        </h3>
        <div className="flex items-center gap-2">
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{candidate.matchScore}%</div>
            <div className="text-xs text-gray-500">Match</div>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-600 mb-3 leading-relaxed">
        {candidate.description}
      </p>

      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all ${
            candidate.matchScore >= 90
              ? 'bg-green-500'
              : candidate.matchScore >= 80
                ? 'bg-blue-500'
                : candidate.matchScore >= 70
                  ? 'bg-yellow-500'
                  : 'bg-orange-500'
          }`}
          style={{ width: `${candidate.matchScore}%` }}
        />
      </div>

      <div className="text-xs text-blue-600 mt-2 opacity-0 group-hover:opacity-100 transition">
        Click to view details →
      </div>
    </div>
  )
}
