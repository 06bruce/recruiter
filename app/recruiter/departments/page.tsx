'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { RecruiterPageLayout } from '@/components/layout/RecruiterPageLayout'
import { DepartmentCard } from '@/components/departments/DepartmentCard'
import { JobVacancyCard } from '@/components/departments/JobVacancyCard'
import { departmentsList, jobVacancies } from '@/lib/mockData'
import { useAuth } from '@/lib/authContext'
import { Department } from '@/lib/types'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function DepartmentsPage() {
  const { recruiter } = useAuth()
  const router = useRouter()
  const [departments, setDepartments] = useState<Department[]>(departmentsList)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (!recruiter) {
      router.push('/recruiter/login')
    }
  }, [recruiter, router])

  if (!recruiter) {
    return null
  }

  const handleAddEmployee = (id: string) => {
    setDepartments(
      departments.map((dept) =>
        dept.id === id
          ? { ...dept, employeeCount: Math.min(dept.employeeCount + 1, dept.capacity) }
          : dept
      )
    )
  }

  const handleRemoveEmployee = (id: string) => {
    setDepartments(
      departments.map((dept) =>
        dept.id === id
          ? { ...dept, employeeCount: Math.max(dept.employeeCount - 1, 0) }
          : dept
      )
    )
  }

  const filteredVacancies = jobVacancies.filter((vacancy) =>
    vacancy.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <RecruiterPageLayout>
      <div className="p-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Department</h1>
            <p className="text-gray-600 mt-1">RecruitmentIQ / Department</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
            + Add Department
          </Button>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-4 gap-6 mb-12">
          {departments.map((dept) => (
            <DepartmentCard
              key={dept.id}
              department={dept}
              onAddEmployee={handleAddEmployee}
              onRemoveEmployee={handleRemoveEmployee}
            />
          ))}
        </div>

        {/* Job Vacancy Section */}
        <div className="border-t-2 border-dashed border-gray-300 pt-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Vacancy</h2>
            <p className="text-gray-600">Latest list based on what you created</p>
          </div>

          {/* Departments Filter & Search */}
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 appearance-none">
                <option>All Departments</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Input */}
            <div className="flex-1 relative max-w-xs ml-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Job Vacancy Grid */}
          <div className="grid grid-cols-2 gap-6">
            {filteredVacancies.map((vacancy) => (
              <JobVacancyCard key={vacancy.id} vacancy={vacancy} />
            ))}
          </div>
        </div>
      </div>
    </RecruiterPageLayout>
  )
}
