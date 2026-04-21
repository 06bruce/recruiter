'use client'

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md px-6">
        {/* Logo & Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            <Image
              src="/recruiteriqa-logo.jpg"
              alt="RecruiterIQ Logo"
              width={80}
              height={80}
              priority
              className="rounded-xl shadow-lg"
            />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">RecruiterIQ</h1>
          <p className="text-gray-600 font-medium">AI-Powered Recruitment Platform</p>
        </div>

        {/* Role Selection Buttons */}
        <div className="space-y-4">
          <Button
            onClick={() => router.push('/candidate/form')}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg transition"
          >
            I&apos;m a Candidate
          </Button>

          <Button
            onClick={() => router.push('/recruiter/login')}
            variant="outline"
            className="w-full h-12 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold text-lg rounded-lg transition"
          >
            I&apos;m a Recruiter
          </Button>
        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-500 text-sm mt-8">
          Join our platform to find the perfect fit
        </p>
      </div>
    </div>
  )
}
