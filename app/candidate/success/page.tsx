'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'

export default function SuccessPage() {
  const router = useRouter()

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-lg text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-8">
          <CheckCircle className="w-24 h-24 text-green-500" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Application Submitted!
        </h1>

        {/* Message */}
        <p className="text-lg text-gray-600 mb-2">
          Thank you for your application.
        </p>
        <p className="text-gray-600 mb-8">
          You&apos;ll see your results later. We&apos;ll review your CV and get back to you soon.
        </p>

        {/* Secondary Message */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg px-6 py-4 mb-8">
          <p className="text-blue-900 text-sm">
            Please check your email for updates on your application status.
          </p>
        </div>

        {/* Back to Home Button */}
        <Button
          onClick={() => router.push('/')}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
        >
          Back to Home
        </Button>
      </div>
    </div>
  )
}
