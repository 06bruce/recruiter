'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/lib/authContext'

export default function CandidateFormPage() {
  const router = useRouter()
  const { submitCandidateApplication } = useAuth()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    positionApplied: '',
    cvFile: null as File | null,
  })
  const [error, setError] = useState('')

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please upload a PDF file')
        return
      }
      setFormData((prev) => ({
        ...prev,
        cvFile: file,
      }))
      setError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.positionApplied ||
      !formData.cvFile
    ) {
      setError('Please fill in all fields and upload a CV')
      setLoading(false)
      return
    }

    try {
      submitCandidateApplication({
        id: '',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        positionApplied: formData.positionApplied,
        cvFileName: formData.cvFile.name,
        submittedAt: new Date(),
      })

      router.push('/candidate/success')
    } catch (err) {
      setError('Failed to submit application')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-lg mb-4">
            <span className="text-white font-bold text-xl">R</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Submit Your Application
          </h1>
          <p className="text-gray-600">Fill out the form below to apply</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <Label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter your phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Position Applied */}
          <div>
            <Label htmlFor="positionApplied" className="block text-sm font-medium text-gray-700 mb-2">
              Position Applied For
            </Label>
            <select
              id="positionApplied"
              name="positionApplied"
              value={formData.positionApplied}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">Select a position</option>
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Backend Developer">Backend Developer</option>
              <option value="QA Engineer">QA Engineer</option>
              <option value="Product Manager">Product Manager</option>
              <option value="Data Analyst">Data Analyst</option>
            </select>
          </div>

          {/* CV Upload */}
          <div>
            <Label htmlFor="cvFile" className="block text-sm font-medium text-gray-700 mb-2">
              Upload CV (PDF)
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg px-6 py-8 text-center hover:border-blue-500 transition cursor-pointer">
              <input
                id="cvFile"
                name="cvFile"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="cvFile" className="cursor-pointer block">
                <div className="mb-2">
                  <svg
                    className="w-8 h-8 mx-auto text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-700">
                  {formData.cvFile
                    ? `Selected: ${formData.cvFile.name}`
                    : 'Click to upload or drag and drop'}
                </p>
                <p className="text-xs text-gray-500 mt-1">PDF files only</p>
              </label>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Application'}
          </Button>

          {/* Back Link */}
          <button
            type="button"
            onClick={() => router.push('/')}
            className="w-full text-center text-blue-600 hover:text-blue-700 text-sm mt-4"
          >
            Back to Home
          </button>
        </form>
      </div>
    </div>
  )
}
