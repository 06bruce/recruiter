import { Department } from '@/lib/types'
import { Plus, Minus } from 'lucide-react'

interface DepartmentCardProps {
  department: Department
  onAddEmployee: (id: string) => void
  onRemoveEmployee: (id: string) => void
}

export function DepartmentCard({
  department,
  onAddEmployee,
  onRemoveEmployee,
}: DepartmentCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-3xl font-bold text-gray-900">{department.employeeCount}</p>
          <p className="text-sm text-gray-600">Employees</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onRemoveEmployee(department.id)}
            className="p-2 text-gray-400 hover:text-gray-600 transition"
          >
            <Minus size={18} />
          </button>
          <button
            onClick={() => onAddEmployee(department.id)}
            className="p-2 text-gray-400 hover:text-gray-600 transition"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-3">{department.name}</h3>

      <div className="text-sm">
        {department.status === 'FULFILLED' ? (
          <p className="text-green-600">Fulfilled</p>
        ) : (
          <p className="text-red-600">-{department.capacity - department.employeeCount} People</p>
        )}
      </div>
    </div>
  )
}
