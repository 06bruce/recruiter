// Recruiter Auth & Dashboard Types
export interface RecruiterUser {
  id: string
  name: string
  email: string
  role: 'Managing Director' | 'HR Manager'
}

// Candidate Application Types
export interface CandidateApplication {
  id: string
  name: string
  email: string
  phone: string
  positionApplied: string
  cvFileName: string
  submittedAt: Date
}

// Dashboard Statistics
export interface StatCard {
  id: string
  title: string
  count: number
  label: string
  date: string
}

// Chart Data for Dashboard
export interface ChartDataPoint {
  month: string
  fulfilled: number
  notFulfilled: number
}

// Candidate in Recruiter View
export interface Candidate {
  id: string
  name: string
  avatar: string
  department: string
  position: string
  dateTime: string
  status: 'Pending Interview' | 'Accepted' | 'Rejected'
  matchScore: number
  description: string
  strengths: string[]
  weaknesses: string[]
  aiSummary: string
}

// Department
export interface Department {
  id: string
  name: string
  employeeCount: number
  capacity: number
  status: 'Fulfilled' | 'Pending'
}

// Job Vacancy
export interface JobVacancy {
  id: string
  title: string
  company: string
  salary: string
  department: string
  experience: string
  applicants: number
  applicantCount: number
  applicantDate: string
  image: string
}

// Auth Context State
export interface AuthContextType {
  recruiter: RecruiterUser | null
  candidate: CandidateApplication | null
  userType: 'recruiter' | 'candidate' | null
  login: (name: string, email: string) => void
  logout: () => void
  submitCandidateApplication: (data: CandidateApplication) => void
}
