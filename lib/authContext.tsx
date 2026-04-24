'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { RecruiterUser, CandidateApplication, AuthContextType } from './types'
import apiClient, { authApi } from './api'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [recruiter, setRecruiter] = useState<RecruiterUser | null>(null)
  const [candidate, setCandidate] = useState<CandidateApplication | null>(null)
  const [userType, setUserType] = useState<'recruiter' | 'candidate' | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load recruiter from localStorage on mount
  useEffect(() => {
    const storedRecruiter = localStorage.getItem('recruiter')
    const token = localStorage.getItem('accessToken')
    if (storedRecruiter && token) {
      try {
        const parsed = JSON.parse(storedRecruiter)
        setRecruiter(parsed)
        setUserType('recruiter')
        apiClient.setToken(token)
      } catch {
        localStorage.removeItem('recruiter')
        localStorage.removeItem('accessToken')
      }
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authApi.login(email, password)
      const newRecruiter: RecruiterUser = {
        id: response.recruiter.id,
        name: response.recruiter.name,
        email: response.recruiter.email,
        role: response.recruiter.role as RecruiterUser['role'],
      }
      setRecruiter(newRecruiter)
      setUserType('recruiter')
      setCandidate(null)
      
      // Store tokens and user info
      apiClient.setToken(response.accessToken)
      localStorage.setItem('recruiter', JSON.stringify(newRecruiter))
      localStorage.setItem('refreshToken', response.refreshToken)
      
      return newRecruiter
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const signup = useCallback(async (name: string, email: string, password: string, role: string) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authApi.signup(name, email, password, role)
      const newRecruiter: RecruiterUser = {
        id: response.recruiter.id,
        name: response.recruiter.name,
        email: response.recruiter.email,
        role: response.recruiter.role as RecruiterUser['role'],
      }
      setRecruiter(newRecruiter)
      setUserType('recruiter')
      setCandidate(null)
      
      // Store tokens and user info
      apiClient.setToken(response.accessToken)
      localStorage.setItem('recruiter', JSON.stringify(newRecruiter))
      localStorage.setItem('refreshToken', response.refreshToken)
      
      return newRecruiter
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Signup failed'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    setLoading(true)
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      if (refreshToken) {
        try {
          await authApi.logout(refreshToken)
        } catch {
          // Ignore errors during logout
        }
      }
    } finally {
      setRecruiter(null)
      setCandidate(null)
      setUserType(null)
      apiClient.clearToken()
      localStorage.removeItem('recruiter')
      localStorage.removeItem('refreshToken')
      setLoading(false)
    }
  }, [])

  const submitCandidateApplication = useCallback(async (data: CandidateApplication) => {
    setLoading(true)
    setError(null)
    try {
      // The data will be sent via form submission in the actual form component
      setCandidate({
        ...data,
        id: data.id || Math.random().toString(36).substr(2, 9),
        submittedAt: data.submittedAt || new Date(),
      })
      setUserType('candidate')
      setRecruiter(null)
      return data
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Application submission failed'
      setError(message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        recruiter,
        candidate,
        userType,
        login,
        signup,
        logout,
        submitCandidateApplication,
        loading,
        error,
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
