// Recruiter Auth & Dashboard Types
export interface RecruiterUser {
  id: string
  name: string
  email: string
  role: 'MANAGING_DIRECTOR' | 'HR_MANAGER'
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
  email: string
  phone: string
  cvFileName: string
  cvFilePath: string
  dateTime: string
  status: 'PENDING' | 'PENDING_INTERVIEW' | 'ACCEPTED' | 'REJECTED'
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
  status: 'FULFILLED' | 'PENDING'
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
  login: (email: string, password: string) => Promise<RecruiterUser>
  signup: (name: string, email: string, password: string, role: string) => Promise<RecruiterUser>
  logout: () => Promise<void>
  submitCandidateApplication: (data: CandidateApplication) => Promise<CandidateApplication>
  loading?: boolean
  error?: string | null
}
