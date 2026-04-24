/**
 * API client for RecruiterIQ backend
 * Handles all HTTP requests to the Express backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  details?: unknown;
}

interface ApiError {
  success: false;
  message: string;
  details?: unknown;
}

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
    this.loadToken();
  }

  private loadToken() {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("accessToken");
    }
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("accessToken", token);
  }

  getToken() {
    return this.token;
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const data = (await response.json()) as ApiResponse<T> | ApiError;

    if (!response.ok) {
      const errorData = data as ApiError;
      throw new Error(errorData.message || "API request failed");
    }

    if (!("success" in data) || !data.success) {
      throw new Error("API request failed");
    }

    return (data as ApiResponse<T>).data;
  }

  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "GET",
      headers: this.getHeaders(),
    });
    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, body: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    return this.handleResponse<T>(response);
  }

  async postForm<T>(endpoint: string, formData: FormData): Promise<T> {
    const headers: HeadersInit = {};
    if (this.token) {
      headers["Authorization"] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "POST",
      headers,
      body: formData,
    });
    return this.handleResponse<T>(response);
  }

  async patch<T>(endpoint: string, body: unknown): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "PATCH",
      headers: this.getHeaders(),
      body: JSON.stringify(body),
    });
    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: "DELETE",
      headers: this.getHeaders(),
    });
    return this.handleResponse<T>(response);
  }
}

// Auth API methods
export const authApi = {
  signup: async (name: string, email: string, password: string, role: string) => {
    const response = await apiClient.post("/auth/signup", {
      name,
      email,
      password,
      role,
    });
    return response as {
      recruiter: { id: string; name: string; email: string; role: string };
      accessToken: string;
      refreshToken: string;
    };
  },

  login: async (email: string, password: string) => {
    const response = await apiClient.post("/auth/login", {
      email,
      password,
    });
    return response as {
      recruiter: { id: string; name: string; email: string; role: string };
      accessToken: string;
      refreshToken: string;
    };
  },

  refresh: async (refreshToken: string) => {
    const response = await apiClient.post("/auth/refresh", {
      refreshToken,
    });
    return response as {
      recruiter: { id: string; name: string; email: string; role: string };
      accessToken: string;
      refreshToken: string;
    };
  },

  logout: async (refreshToken: string) => {
    return apiClient.post("/auth/logout", { refreshToken });
  },
};

// Candidates API methods
export const candidatesApi = {
  apply: async (formData: FormData): Promise<{ data: unknown; emailSent: boolean }> => {
    const headers: HeadersInit = {};
    const token = apiClient.getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}/candidates/apply`, {
      method: "POST",
      headers,
      body: formData,
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Failed to submit application");
    }

    return { data: result.data, emailSent: !!result.emailSent };
  },

  getAll: async (page = 1, limit = 10, search?: string, status?: string) => {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    if (search) params.append("search", search);
    if (status) params.append("status", status);
    return apiClient.get(`/candidates?${params.toString()}`);
  },

  getById: async (id: string) => {
    return apiClient.get(`/candidates/${id}`);
  },

  updateStatus: async (id: string, status: string) => {
    return apiClient.patch(`/candidates/${id}/status`, { status });
  },

  delete: async (id: string) => {
    return apiClient.delete(`/candidates/${id}`);
  },
};

// Departments API methods
export const departmentsApi = {
  getAll: async () => {
    return apiClient.get("/departments");
  },

  getById: async (id: string) => {
    return apiClient.get(`/departments/${id}`);
  },

  create: async (name: string, employeeCount: number, capacity: number) => {
    return apiClient.post("/departments", {
      name,
      employeeCount,
      capacity,
    });
  },

  update: async (
    id: string,
    data: { employeeCount?: number; capacity?: number; status?: string }
  ) => {
    return apiClient.patch(`/departments/${id}`, data);
  },

  delete: async (id: string) => {
    return apiClient.delete(`/departments/${id}`);
  },
};

// Vacancies API methods
export const vacanciesApi = {
  getAll: async () => {
    return apiClient.get("/vacancies");
  },

  getById: async (id: string) => {
    return apiClient.get(`/vacancies/${id}`);
  },

  create: async (
    title: string,
    company: string,
    salaryMin: number,
    salaryMax: number,
    departmentId: string,
    experience: string,
    imageUrl?: string
  ) => {
    return apiClient.post("/vacancies", {
      title,
      company,
      salaryMin,
      salaryMax,
      departmentId,
      experience,
      imageUrl,
    });
  },

  update: async (
    id: string,
    data: {
      title?: string;
      company?: string;
      salaryMin?: number;
      salaryMax?: number;
      departmentId?: string;
      experience?: string;
      imageUrl?: string;
    }
  ) => {
    return apiClient.patch(`/vacancies/${id}`, data);
  },

  delete: async (id: string) => {
    return apiClient.delete(`/vacancies/${id}`);
  },
};

// Dashboard API methods
export const dashboardApi = {
  getStats: async () => {
    return apiClient.get("/dashboard/stats");
  },

  getTopCandidates: async (limit = 5) => {
    return apiClient.get(`/dashboard/top-candidates?limit=${limit}`);
  },

  getChartData: async () => {
    return apiClient.get("/dashboard/chart-data");
  },
};

// AI API methods
export const aiApi = {
  analyzeCandidate: async (candidateId: string) => {
    return apiClient.post(`/ai/analyze/${candidateId}`, {});
  },
};

// Create and export singleton instance
const apiClient = new ApiClient();
export default apiClient;
