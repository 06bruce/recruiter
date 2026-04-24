'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Button } from '@/components/ui/button'
import { CheckCircle, AlertTriangle } from 'lucide-react'

function SuccessContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const emailSent = searchParams.get('emailSent') === 'true'
  const email = searchParams.get('email') || 'your email'

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-lg text-center">
        {/* Icon */}
        <div className="flex justify-center mb-8">
          {emailSent ? (
            <CheckCircle className="w-24 h-24 text-green-500" strokeWidth={1.5} />
          ) : (
            <AlertTriangle className="w-24 h-24 text-amber-500" strokeWidth={1.5} />
          )}
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Application Submitted!
        </h1>

        {/* Message */}
        {emailSent ? (
          <>
            <p className="text-lg text-gray-600 mb-2">
              Thank you for your application.
            </p>
            <p className="text-gray-600 mb-8">
              A confirmation email has been sent to <strong>{email}</strong>.
            </p>

            {/* Success Email Banner */}
            <div className="bg-green-50 border border-green-200 rounded-lg px-6 py-4 mb-8">
              <p className="text-green-900 text-sm">
                ✅ Confirmation email sent successfully. Please check your inbox (and spam folder) for updates on your application status.
              </p>
            </div>
          </>
        ) : (
          <>
            <p className="text-lg text-gray-600 mb-2">
              Your application was received, but we couldn&apos;t send a confirmation email to <strong>{email}</strong>.
            </p>
            <p className="text-gray-600 mb-8">
              Don&apos;t worry — your application is still being processed. Our team will review your CV and get back to you soon.
            </p>

            {/* Warning Email Banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg px-6 py-4 mb-8">
              <p className="text-amber-900 text-sm">
                ⚠️ Confirmation email could not be sent. Please ensure your email address is correct. If you have any concerns, contact our support team.
              </p>
            </div>
          </>
        )}

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

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-500">Loading...</p>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  )
}
