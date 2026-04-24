import { Candidate, Department, JobVacancy, RecruiterUser, StatCard } from "./types";

const formatDate = (value?: string) =>
  value ? new Date(value).toLocaleString() : new Date().toLocaleString();

const statusLabelMap: Record<Candidate["status"], string> = {
  PENDING: "Pending",
  PENDING_INTERVIEW: "Pending Interview",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
};

export const roleLabelMap: Record<RecruiterUser["role"], string> = {
  HR_MANAGER: "HR Manager",
  MANAGING_DIRECTOR: "Managing Director",
};

export const mapApiCandidate = (item: any): Candidate => ({
  id: item._id ?? item.id,
  name: item.name ?? "Unknown",
  avatar: "https://ui-avatars.com/api/?background=2563eb&color=fff&name=" + encodeURIComponent(item.name ?? "Candidate"),
  department: item.department ?? "Not specified",
  position: item.positionApplied ?? "-",
  email: item.email ?? "",
  phone: item.phone ?? "",
  cvFileName: item.cvFileName ?? "",
  cvFilePath: item.cvFilePath ?? "",
  dateTime: formatDate(item.createdAt),
  status: (item.status ?? "PENDING") as Candidate["status"],
  matchScore: typeof item.matchScore === "number" ? item.matchScore : 0,
  description: item.aiSummary ?? `${item.positionApplied ?? "Candidate"} applicant`,
  strengths: Array.isArray(item.strengths) ? item.strengths : [],
  weaknesses: Array.isArray(item.weaknesses) ? item.weaknesses : [],
  aiSummary: item.aiSummary ?? "AI analysis is not available yet.",
});

export const getCandidateStatusLabel = (status: Candidate["status"]) => statusLabelMap[status];

export const mapApiDepartment = (item: any): Department => ({
  id: item._id ?? item.id,
  name: item.name,
  employeeCount: item.employeeCount ?? 0,
  capacity: item.capacity ?? 0,
  status: (item.status ?? "PENDING") as Department["status"],
});

export const mapApiVacancy = (item: any): JobVacancy => {
  const departmentName =
    typeof item.departmentId === "object" && item.departmentId?.name
      ? item.departmentId.name
      : "General";

  return {
    id: item._id ?? item.id,
    title: item.title ?? "-",
    company: item.company ?? "-",
    salary: `IDR ${item.salaryMin ?? 0} - ${item.salaryMax ?? 0}/Month`,
    department: departmentName,
    experience: item.experience ?? "-",
    applicants: item.applicantCount ?? 0,
    applicantCount: item.applicantCount ?? 0,
    applicantDate: formatDate(item.createdAt),
    image: item.imageUrl || "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop",
  };
};

export const buildStatsFromDashboard = (stats: any): StatCard[] => [
  { id: "1", title: String(stats?.candidates?.pending ?? 0), count: stats?.candidates?.pending ?? 0, label: "Dalam Review", date: "Live" },
  { id: "2", title: String(stats?.candidates?.accepted ?? 0), count: stats?.candidates?.accepted ?? 0, label: "Diterima", date: "Live" },
  { id: "3", title: String(stats?.candidates?.rejected ?? 0), count: stats?.candidates?.rejected ?? 0, label: "Rejected", date: "Live" },
];
