'use client'

import { RecruiterPageLayout } from '@/components/layout/RecruiterPageLayout'

export default function MessagesPage() {
  return (
    <RecruiterPageLayout>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
        <p className="text-gray-600 mt-2">Recruiter communication inbox will appear here.</p>
      </div>
    </RecruiterPageLayout>
  )
}
