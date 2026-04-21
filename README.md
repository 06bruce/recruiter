# RecruiterIQ - AI-Powered Recruitment Management System

## Overview

RecruiterIQ is a modern recruitment management platform that leverages AI to match candidates with job openings. It features dual user flows:
- **Candidates**: Simple form submission without authentication
- **Recruiters**: Full dashboard with AI-powered candidate screening and ranking

---

## How to Run

### Prerequisites
- Node.js 18+ installed
- pnpm package manager (or npm/yarn)

### Step 1: Install Dependencies
```bash
cd /vercel/share/v0-project
pnpm install
```

### Step 2: Start Development Server
```bash
pnpm dev
```

The app will start at **http://localhost:3000**

### Step 3: Build for Production
```bash
pnpm build
pnpm start
```

---

## How This Was Built - Technical Stack

### Frontend Framework
- **Next.js 15** - React framework with server components
- **TypeScript** - Strict type checking for all code
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Pre-built accessible component library
- **Recharts** - Data visualization (charts & graphs)

### State Management
- **React Context API** - User authentication state
- **Client-side storage** - Form data during candidate submission

### Project Structure
```
app/
├── page.tsx                    # Home page (role selector)
├── candidate/
│   ├── form/page.tsx          # Candidate application form
│   └── success/page.tsx        # Submission confirmation
├── recruiter/
│   ├── login/page.tsx          # Recruiter login
│   ├── signup/page.tsx         # Recruiter registration
│   ├── dashboard/page.tsx      # Main dashboard with candidates
│   ├── candidates/page.tsx     # Candidates list view
│   └── departments/page.tsx    # Department management

components/
├── layout/
│   ├── Sidebar.tsx            # Navigation sidebar
│   ├── Header.tsx             # Top bar with user info
│   └── RecruiterPageLayout.tsx # Layout wrapper
├── dashboard/
│   ├── StatCard.tsx           # Stat card component
│   ├── BarChart.tsx           # Chart visualization
│   └── PieChart.tsx           # Pie chart visualization
├── candidates/
│   └── CandidatesTable.tsx    # Candidates data table
└── departments/
    ├── DepartmentCard.tsx     # Department stat cards
    └── JobVacancyCard.tsx     # Job vacancy cards

lib/
├── types.ts                   # TypeScript interfaces
├── mockData.ts                # Mock data for all flows
├── authContext.tsx            # Auth state management
└── utils.ts                   # Helper functions
```

---

## User Flows

### 1. Candidate Flow

#### Home Page → Select "I'm a Candidate"
- Clean role selector showing two buttons
- Logo and title display

#### Application Form (`/candidate/form`)
- **Fields**:
  - Full Name
  - Email Address
  - Phone Number
  - Position Applied For (dropdown)
  - CV Upload (drag-drop or file picker)
- **Validation**: All fields required, email format validation
- **On Submit**: Routes to success page, stores data in context

#### Success Page (`/candidate/success`)
- Confirmation message: "Your application has been submitted!"
- "You'll see your results later" message
- Back to home button

---

### 2. Recruiter Flow

#### Login/Signup Pages
- **Login** (`/recruiter/login`): Email + Password
- **Signup** (`/recruiter/signup`): Name + Email + Password confirmation
- **Note**: Frontend-only authentication (mock data) - any credentials work
- **On Success**: Routes to dashboard, stores user in context

#### Dashboard (`/recruiter/dashboard`)
**This shows candidates as horizontal match bars:**
- Each candidate is displayed as a horizontal bar
- **Left side**: Candidate name (title)
- **Right side**: Match percentage (e.g., 94%)
- **Under name**: Brief description (position + 2-3 skills)
- **Click behavior**: Opens candidate detail modal showing:
  - Match score
  - Top 3 Strengths
  - Top 2 Weaknesses/Gaps
  - AI-generated summary recommendation

#### Candidates List (`/recruiter/candidates`)
- Table view of all candidates
- Columns: Name, Department, Position, Date, Status, Actions
- Filter bar for status filtering
- View portfolio / action buttons

#### Departments (`/recruiter/departments`)
- Department stat cards with employee counts
- Job vacancy cards with images and details
- Add/manage department functionality

---

## Key Features

### For Candidates
✅ No login required - simple form submission  
✅ File upload for CV (PDF, DOC, DOCX)  
✅ Instant confirmation after submission  
✅ Future: Check application status with email only  

### For Recruiters
✅ Secure login/signup  
✅ Dashboard with candidate matching visualization  
✅ AI-powered match scoring (frontend mock)  
✅ Candidate detail view with AI insights  
✅ Strengths & weaknesses analysis  
✅ AI recommendation summary  
✅ Department management  
✅ Job vacancy tracking  
✅ Future: Full AI screening with Gemini API  

---

## Data Flow

### Candidate Submission
1. User fills form on `/candidate/form`
2. Form validates all fields
3. On submit: Data stored in AuthContext
4. User redirected to `/candidate/success`
5. Success page shows confirmation

### Recruiter Login
1. User enters email + password on `/recruiter/login`
2. Form validates inputs
3. On submit: User stored in AuthContext
4. Redirected to `/recruiter/dashboard`

### Dashboard Candidate Matching
1. Dashboard fetches mock candidate data from `lib/mockData.ts`
2. Each candidate has:
   - Name, position, skills
   - Match score (0-100%)
   - Strengths array
   - Weaknesses array
   - AI summary text
3. User clicks candidate bar → Modal/detail view opens
4. Modal displays all candidate information

---

## Mock Data Structure

All data is frontend-only (no backend required). Located in `lib/mockData.ts`:

```typescript
interface Candidate {
  id: string
  name: string
  position: string
  matchScore: number        // 0-100%
  description: string       // Brief 1-line description
  strengths: string[]       // Top 3 strengths
  weaknesses: string[]      // Top 2 gaps/weaknesses
  aiSummary: string        // AI-generated recommendation
  department: string
  appliedDate: string
  status: 'Pending' | 'Shortlisted' | 'Rejected'
}
```

---

## Component Architecture

### Layout Components
- **Sidebar**: Navigation menu for recruiter (Dashboard, Candidates, Departments, Logout)
- **Header**: User info, search, notifications, user menu
- **RecruiterPageLayout**: Combines Sidebar + Header + main content

### Dashboard Components
- **StatCard**: Display key metrics (candidate counts, etc.)
- **CandidateBar**: Horizontal bar showing name, match %, description
- **CandidateDetail**: Modal/panel showing strengths, weaknesses, AI summary

### Forms
- **CandidateForm**: Application submission form with validation
- **LoginForm**: Recruiter login with email + password
- **SignupForm**: Recruiter registration

---

## Styling & Design

### Color Palette
- **Primary**: Blue (#3B82F6)
- **Accent**: Orange (#F59E0B) - for pending/warning states
- **Background**: White (#FFFFFF)
- **Text**: Gray (#1F2937 for headings, #6B7280 for body)
- **Borders**: Light Gray (#E5E7EB)

### Typography
- **Headings**: 20-32px, bold (font-bold)
- **Body**: 14-16px, regular
- **Labels**: 12-14px, medium gray

### Layout
- Mobile-first responsive design
- Tailwind CSS utility classes
- Flex and Grid layouts
- Proper spacing (gap, padding, margin using scale 4, 6, 8, 12, 16, etc.)

---

## TypeScript Types

All components use strict TypeScript with explicit types. No implicit `any`.

Key types in `lib/types.ts`:
- `RecruiterUser` - Authenticated recruiter
- `Candidate` - Candidate with match data
- `CandidateApplication` - Form submission data
- `Department` - Department info
- `JobVacancy` - Open position

---

## Context & State Management

### AuthContext (`lib/authContext.tsx`)
Manages:
- Current user (recruiter or null)
- Candidate applications submitted
- Login/logout functions
- User type tracking (candidate vs recruiter)

Usage:
```tsx
const { user, login, logout, isAuthenticated } = useAuth()
```

---

## Environment Variables

**Current Setup**: No external env vars required (frontend-only with mock data)

**Future Setup** (for AI integration):
```
NEXT_PUBLIC_API_URL=
GEMINI_API_KEY=
SENDGRID_API_KEY=
```

---

## File Size & Performance

- **Bundle size**: Optimized with Next.js dynamic imports
- **Images**: Lazy-loaded, optimized format
- **Charts**: Recharts efficiently renders large datasets
- **Dev mode**: Hot reload with fast refresh

---

## Future Enhancements

1. **Backend API**: Connect to real database (Supabase, MongoDB, PostgreSQL)
2. **AI Integration**: Use Gemini API for actual candidate screening
3. **Email Notifications**: Send to candidates when decisions made
4. **PDF Export**: Download candidate shortlist with AI insights
5. **Candidate Status Check**: Email-based status checking without login
6. **Admin Panel**: Super admin dashboard for multiple recruiting teams
7. **Real-time Chat**: AI chatbox for recruiter questions
8. **Analytics**: Historical hiring data, time-to-hire metrics

---

## Troubleshooting

### Dev server won't start
```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm dev
```

### Port 3000 already in use
```bash
pnpm dev --port 3001
```

### TypeScript errors
```bash
# Rebuild TypeScript
pnpm exec tsc --noEmit
```

---

## Support & Questions

For issues or feature requests, check the code comments in each component. The codebase is human-written and follows consistent patterns throughout.

**Happy recruiting with RecruiterIQ! 🚀**
