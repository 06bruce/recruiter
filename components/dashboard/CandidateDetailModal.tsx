'use client'

import { Candidate } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

interface CandidateDetailModalProps {
  candidate: Candidate | null
  onClose: () => void
}

export function CandidateDetailModal({ candidate, onClose }: CandidateDetailModalProps) {
  if (!candidate) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{candidate.name}</h2>
            <p className="text-gray-600">{candidate.position}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Match Score */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Overall Match Score</p>
                <p className="text-gray-600 text-sm">Based on skills, experience, and qualifications</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold text-blue-600">{candidate.matchScore}%</div>
              </div>
            </div>

            {/* Score Bar */}
            <div className="mt-4 w-full bg-gray-300 rounded-full h-3 overflow-hidden">
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
          </div>

          {/* Strengths */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              Top Strengths
            </h3>
            <div className="space-y-2">
              {candidate.strengths.map((strength, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-green-50 rounded-lg border border-green-200"
                >
                  <span className="text-green-600 font-bold text-lg mt-0.5">✓</span>
                  <span className="text-gray-700">{strength}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Weaknesses */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-orange-500 rounded-full" />
              Areas for Development
            </h3>
            <div className="space-y-2">
              {candidate.weaknesses.map((weakness, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200"
                >
                  <span className="text-orange-600 font-bold text-lg mt-0.5">→</span>
                  <span className="text-gray-700">{weakness}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Summary */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              AI Recommendation
            </h3>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-gray-700 leading-relaxed">{candidate.aiSummary}</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-200">
            <div>
              <p className="text-gray-500 text-sm">Applied Date</p>
              <p className="text-gray-900 font-medium">{candidate.dateTime}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Department</p>
              <p className="text-gray-900 font-medium">{candidate.department}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Status</p>
              <p className="text-gray-900 font-medium">
                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                  candidate.status === 'Pending Interview'
                    ? 'bg-yellow-100 text-yellow-800'
                    : candidate.status === 'Accepted'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                }`}>
                  {candidate.status}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex gap-3 justify-end">
          <Button
            onClick={onClose}
            variant="outline"
            className="px-6"
          >
            Close
          </Button>
          <Button className="px-6 bg-blue-600 hover:bg-blue-700 text-white">
            Schedule Interview
          </Button>
        </div>
      </div>
    </div>
  )
}
