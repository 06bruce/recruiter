'use client'

import { useEffect, useState } from 'react'
import { RecruiterPageLayout } from '@/components/layout/RecruiterPageLayout'
import { StatCard } from '@/components/dashboard/StatCard'
import { CandidateBar } from '@/components/dashboard/CandidateBar'
import { CandidateDetailModal } from '@/components/dashboard/CandidateDetailModal'
import { useAuth } from '@/lib/authContext'
import { useRouter } from 'next/navigation'
import { Candidate } from '@/lib/types'
import { dashboardApi } from '@/lib/api'
import { buildStatsFromDashboard, mapApiCandidate } from '@/lib/mappers'

export default function DashboardPage() {
  const { recruiter } = useAuth()
  const router = useRouter()
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null)
  const [stats, setStats] = useState<any[]>([])
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!recruiter) {
      router.push('/recruiter/login')
      return
    }
    const loadData = async () => {
      try {
        const [statsRes, topCandidates] = await Promise.all([
          dashboardApi.getStats(),
          dashboardApi.getTopCandidates(6),
        ])
        setStats(buildStatsFromDashboard(statsRes))
        setCandidates((topCandidates as any[]).map(mapApiCandidate))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }
    void loadData()
  }, [recruiter, router])

  if (!recruiter) {
    return null
  }

  const sortedCandidates = [...candidates].sort(
    (a, b) => b.matchScore - a.matchScore
  )

  return (
    <RecruiterPageLayout>
      <div className="p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">AI-Powered Candidate Ranking</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>
        {loading && <p className="text-sm text-gray-500 mb-6">Loading dashboard...</p>}
        {error && <p className="text-sm text-red-600 mb-6">{error}</p>}

        {/* Candidates Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Top Candidates</h2>
            <p className="text-gray-600">Ranked by AI match score. Click any candidate to view details.</p>
          </div>

          {/* Candidate Bars */}
          <div className="space-y-2">
            {sortedCandidates.map((candidate) => (
              <CandidateBar
                key={candidate.id}
                candidate={candidate}
                onSelect={setSelectedCandidate}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Candidate Detail Modal */}
      <CandidateDetailModal
        candidate={selectedCandidate}
        onClose={() => setSelectedCandidate(null)}
      />
    </RecruiterPageLayout>
  )
}
