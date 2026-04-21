'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { RecruiterPageLayout } from '@/components/layout/RecruiterPageLayout'
import { StatCard } from '@/components/dashboard/StatCard'
import { CandidatesTable } from '@/components/candidates/CandidatesTable'
import { dashboardStats, candidatesList } from '@/lib/mockData'
import { useAuth } from '@/lib/authContext'
import { Search, Filter } from 'lucide-react'

export default function CandidatesPage() {
  const { recruiter } = useAuth()
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (!recruiter) {
      router.push('/recruiter/login')
    }
  }, [recruiter, router])

  if (!recruiter) {
    return null
  }

  const filteredCandidates = candidatesList.filter((candidate) =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
          {dashboardStats.map((stat) => (
            <StatCard key={stat.id} stat={stat} />
          ))}
        </div>

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
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 appearance-none pr-8">
                <option>Pending Interview</option>
                <option>Accepted</option>
                <option>Rejected</option>
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
          <CandidatesTable candidates={filteredCandidates} />
        </div>
      </div>
    </RecruiterPageLayout>
  )
}
