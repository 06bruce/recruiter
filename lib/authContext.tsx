'use client'

import React, { createContext, useContext, useState } from 'react'
import { RecruiterUser, CandidateApplication, AuthContextType } from './types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [recruiter, setRecruiter] = useState<RecruiterUser | null>(null)
  const [candidate, setCandidate] = useState<CandidateApplication | null>(null)
  const [userType, setUserType] = useState<'recruiter' | 'candidate' | null>(null)

  const login = (name: string, email: string) => {
    const newRecruiter: RecruiterUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: 'HR Manager',
    }
    setRecruiter(newRecruiter)
    setUserType('recruiter')
    setCandidate(null)
  }

  const logout = () => {
    setRecruiter(null)
    setCandidate(null)
    setUserType(null)
  }

  const submitCandidateApplication = (data: CandidateApplication) => {
    setCandidate({
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      submittedAt: new Date(),
    })
    setUserType('candidate')
    setRecruiter(null)
  }

  return (
    <AuthContext.Provider
      value={{
        recruiter,
        candidate,
        userType,
        login,
        logout,
        submitCandidateApplication,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
