import { JobVacancy } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { MapPin, Clock, Users } from 'lucide-react'

interface JobVacancyCardProps {
  vacancy: JobVacancy
}

export function JobVacancyCard({ vacancy }: JobVacancyCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition">
      {/* Image */}
      <div className="h-48 bg-gray-200 overflow-hidden">
        <img
          src={vacancy.image}
          alt={vacancy.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title & Company */}
        <h3 className="text-lg font-bold text-gray-900 mb-1">{vacancy.title}</h3>
        <p className="text-sm text-gray-600 mb-4">{vacancy.company}</p>

        {/* Details */}
        <div className="space-y-3 mb-6 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={16} />
            <span>{vacancy.salary}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Clock size={16} />
            <span>{vacancy.department}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <Users size={16} />
            <span>{vacancy.experience}</span>
          </div>
        </div>

        {/* Applicants Info */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Users size={16} />
          <span>{vacancy.applicantCount} Applicants</span>
          <span className="text-xs">post of {vacancy.applicantDate}</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg">
            Edit
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg"
          >
            Detail
          </Button>
        </div>
      </div>
    </div>
  )
}
