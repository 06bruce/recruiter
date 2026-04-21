# RecruitmentIQ - AI-Powered Recruitment Management System

## Overview

RecruitmentIQ is a modern recruitment management platform that leverages AI to match candidates with job openings. It features dual user flows:

- **Candidates**: Simple form submission without authentication
- **Recruiters**: Full dashboard with AI-powered candidate screening and ranking

---

## How to Run

### Prerequisites
- Node.js 18+ installed
- npm package manager

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Start Development Server
```bash
npm run dev
```

The app will start at **http://localhost:3000**

### Step 3: Build for Production
```bash
npm run build
npm start
```

---

## Tech Stack

- **Next.js** - React framework with server components
- **TypeScript** - Strict type checking for all code
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Pre-built accessible component library
- **Recharts** - Data visualization (charts & graphs)
- **React Context API** - User authentication state

---

## Project Structure

```
app/
├── page.tsx                    # Home page (role selector)
├── candidate/
│   ├── form/page.tsx           # Candidate application form
│   └── success/page.tsx        # Submission confirmation
├── recruiter/
│   ├── login/page.tsx          # Recruiter login
│   ├── signup/page.tsx         # Recruiter registration
│   ├── dashboard/page.tsx      # Main dashboard with candidates
│   ├── candidates/page.tsx     # Candidates list view
│   └── departments/page.tsx    # Department management
components/
├── layout/
│   ├── Sidebar.tsx             # Navigation sidebar
│   ├── Header.tsx              # Top bar with user info
│   └── RecruiterPageLayout.tsx # Layout wrapper
├── dashboard/
│   ├── StatCard.tsx            # Stat card component
│   ├── BarChart.tsx            # Chart visualization
│   └── PieChart.tsx            # Pie chart visualization
├── candidates/
│   └── CandidatesTable.tsx     # Candidates data table
└── departments/
    ├── DepartmentCard.tsx      # Department stat cards
    └── JobVacancyCard.tsx      # Job vacancy cards
lib/
├── types.ts                    # TypeScript interfaces
├── mockData.ts                 # Mock data for all flows
├── authContext.tsx             # Auth state management
└── utils.ts                    # Helper functions
```

---

## Key Features

### For Candidates
✅ No login required — simple form submission  
✅ File upload for CV (PDF, DOC, DOCX)  
✅ Instant confirmation after submission  

### For Recruiters
✅ Secure login/signup  
✅ Dashboard with candidate matching visualization  
✅ AI-powered match scoring  
✅ Candidate detail view with AI insights  
✅ Strengths & weaknesses analysis  
✅ AI recommendation summary  
✅ Department management  
✅ Job vacancy tracking  

---

## User Flows

### Candidate Flow
1. Select **"I'm a Candidate"** on the home page
2. Fill in the application form (name, email, phone, position, CV upload)
3. Submit and receive confirmation

### Recruiter Flow
1. Select **"I'm a Recruiter"** on the home page
2. Login or Sign up
3. View dashboard with AI-ranked candidates
4. Click any candidate to see match score, strengths, weaknesses, and AI summary

---

## Future Enhancements

1. **Backend API** — Connect to a real database (Supabase, MongoDB, PostgreSQL)
2. **AI Integration** — Use Gemini API for actual candidate screening
3. **Email Notifications** — Notify candidates when decisions are made
4. **PDF Export** — Download candidate shortlist with AI insights
5. **Analytics** — Historical hiring data and time-to-hire metrics

---

## Troubleshooting

### Dev server won't start
```bash
rm -rf node_modules
npm install
npm run dev
```

### Port 3000 already in use
```bash
npm run dev -- --port 3001
```

### TypeScript errors
```bash
npx tsc --noEmit
```

---

**Happy recruiting with RecruitmentIQ! 🚀**
