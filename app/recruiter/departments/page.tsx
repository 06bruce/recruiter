'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { RecruiterPageLayout } from '@/components/layout/RecruiterPageLayout'
import { DepartmentCard } from '@/components/departments/DepartmentCard'
import { JobVacancyCard } from '@/components/departments/JobVacancyCard'
import { useAuth } from '@/lib/authContext'
import { Department, JobVacancy } from '@/lib/types'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { departmentsApi, vacanciesApi } from '@/lib/api'
import { mapApiDepartment, mapApiVacancy } from '@/lib/mappers'

export default function DepartmentsPage() {
  const { recruiter } = useAuth()
  const router = useRouter()
  const [departments, setDepartments] = useState<Department[]>([])
  const [vacancies, setVacancies] = useState<JobVacancy[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!recruiter) {
      router.push('/recruiter/login')
      return
    }
    const loadData = async () => {
      try {
        const [deps, vacs] = await Promise.all([departmentsApi.getAll(), vacanciesApi.getAll()])
        setDepartments((deps as any[]).map(mapApiDepartment))
        setVacancies((vacs as any[]).map(mapApiVacancy))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load departments data')
      }
    }
    void loadData()
  }, [recruiter, router])

  if (!recruiter) {
    return null
  }

  const handleAddEmployee = async (id: string) => {
    const department = departments.find((dept) => dept.id === id)
    if (!department) return
    const employeeCount = Math.min(department.employeeCount + 1, department.capacity)
    const updated = await departmentsApi.update(id, {
      employeeCount,
      capacity: department.capacity,
      status: employeeCount >= department.capacity ? 'FULFILLED' : 'PENDING',
    })
    setDepartments((prev) => prev.map((item) => (item.id === id ? mapApiDepartment(updated) : item)))
  }

  const handleRemoveEmployee = async (id: string) => {
    const department = departments.find((dept) => dept.id === id)
    if (!department) return
    const employeeCount = Math.max(department.employeeCount - 1, 0)
    const updated = await departmentsApi.update(id, {
      employeeCount,
      capacity: department.capacity,
      status: employeeCount >= department.capacity ? 'FULFILLED' : 'PENDING',
    })
    setDepartments((prev) => prev.map((item) => (item.id === id ? mapApiDepartment(updated) : item)))
  }

  const filteredVacancies = vacancies.filter((vacancy) => {
    const matchesSearch = vacancy.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = !departmentFilter || vacancy.department === departmentFilter
    return matchesSearch && matchesDepartment
  })

  const handleAddDepartment = async () => {
    const name = window.prompt('Department name')
    if (!name) return
    const created = await departmentsApi.create(name, 0, 1)
    setDepartments((prev) => [mapApiDepartment(created), ...prev])
  }

  const handleEditVacancy = async (vacancy: JobVacancy) => {
    const nextTitle = window.prompt('Update vacancy title', vacancy.title)
    if (!nextTitle) return
    const updated = await vacanciesApi.update(vacancy.id, { title: nextTitle })
    setVacancies((prev) => prev.map((item) => (item.id === vacancy.id ? mapApiVacancy(updated) : item)))
  }

  const handleVacancyDetail = (vacancy: JobVacancy) => {
    window.alert(`${vacancy.title}\n${vacancy.company}\n${vacancy.salary}\n${vacancy.department}`)
  }

  return (
    <RecruiterPageLayout>
      <div className="p-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Department</h1>
            <p className="text-gray-600 mt-1">RecruitmentIQ / Department</p>
          </div>
          <Button onClick={handleAddDepartment} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
            + Add Department
          </Button>
        </div>
        {error && <p className="text-sm text-red-600 mb-4">{error}</p>}

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
              <select value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 appearance-none">
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.name}>
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
              <JobVacancyCard key={vacancy.id} vacancy={vacancy} onEdit={handleEditVacancy} onDetail={handleVacancyDetail} />
            ))}
          </div>
        </div>
      </div>
    </RecruiterPageLayout>
  )
}
