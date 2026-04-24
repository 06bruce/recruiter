'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { RecruiterPageLayout } from '@/components/layout/RecruiterPageLayout'
import { StatCard } from '@/components/dashboard/StatCard'
import { CandidatesTable } from '@/components/candidates/CandidatesTable'
import { useAuth } from '@/lib/authContext'
import { Search, Filter } from 'lucide-react'
import { candidatesApi, dashboardApi } from '@/lib/api'
import { buildStatsFromDashboard, mapApiCandidate } from '@/lib/mappers'
import { Candidate } from '@/lib/types'

export default function CandidatesPage() {
  const { recruiter } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [stats, setStats] = useState<any[]>([])
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!recruiter) {
      router.push('/recruiter/login')
      return
    }
    const loadPage = async () => {
      setLoading(true)
      try {
        const [statsRes, candidatesRes] = await Promise.all([
          dashboardApi.getStats(),
          candidatesApi.getAll(1, 50, searchTerm || undefined, statusFilter || undefined),
        ])
        setStats(buildStatsFromDashboard(statsRes))
        setCandidates((candidatesRes as any).candidates.map(mapApiCandidate))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load candidates')
      } finally {
        setLoading(false)
      }
    }
    void loadPage()
  }, [recruiter, router, searchTerm, statusFilter])

  if (!recruiter) {
    return null
  }

  const filteredCandidates = candidates

  const handleStatusChange = async (id: string, status: string) => {
    await candidatesApi.updateStatus(id, status)
    setCandidates((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: status as Candidate['status'] } : item))
    )
  }

  return (
    <RecruiterPageLayout>
      <div className="p-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">List Kandidat</h1>
          <p className="text-gray-600 mt-1">HrisApps / List Kandidat</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>
        {loading && <p className="text-sm text-gray-500 mb-4">Loading candidates...</p>}
        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

        {/* Candidates Section */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Review All Kandidat</h2>
            <p className="text-gray-600">List terbaru berdasarkan tanggal apply</p>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-4 mb-6">
            {/* Filter Dropdown */}
            <div className="relative">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 appearance-none pr-8">
                <option value="">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="PENDING_INTERVIEW">Pending Interview</option>
                <option value="ACCEPTED">Accepted</option>
                <option value="REJECTED">Rejected</option>
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>

            {/* Search Input */}
            <div className="flex-1 relative ml-auto max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Table */}
          <CandidatesTable
            candidates={filteredCandidates}
            onStatusChange={handleStatusChange}
            onViewPortfolio={(candidate) => window.open(`${process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:4000'}/${candidate.cvFilePath}`, '_blank')}
          />
        </div>
      </div>
    </RecruiterPageLayout>
  )
}
