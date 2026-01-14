const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export type Service = {
  id: string;
  name: string;
  slug: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  weight: number;
  seoTitle: string;
  seoDescription: string;
};

export type PortfolioItem = {
  id: string;
  title: string;
  slug: string;
  description: string;
  tags: string[];
  date: string;
  media: { type: "image" | "video"; url: string }[];
  results?: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover: string;
  category: string;
  focusKeyword: string;
  metaTitle: string;
  metaDescription: string;
  createdAt: string;
  readingTime: number;
};

export type SiteSettings = {
  id: string;
  logoText: string;
  faviconUrl?: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  social: {
    instagram: string;
    linkedin: string;
    youtube: string;
  };
  gaMeasurementId?: string;
  enableAnimations: boolean;
  enableHero3d: boolean;
};

export type Lead = {
  id: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  note: string;
  services: string[];
  sector: string;
  goal: string;
  contentCount: number;
  hasAdBudget: boolean;
  minPrice: number;
  maxPrice: number;
  recommended: number;
  createdAt: string;
};

export type Logo = {
  id: string;
  name: string;
  url: string;
  active: boolean;
  order: number;
};

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {})
    },
    ...options
  });
  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export const api = {
  login: (email: string, password: string) =>
    request<{ token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    }),
  getServices: () => request<Service[]>("/services"),
  getService: (slug: string) => request<Service>(`/services/${slug}`),
  getPortfolio: () => request<PortfolioItem[]>("/portfolio"),
  getPortfolioItem: (slug: string) => request<PortfolioItem>(`/portfolio/${slug}`),
  getBlog: () => request<BlogPost[]>("/blog"),
  getBlogPost: (slug: string) => request<BlogPost>(`/blog/${slug}`),
  getSettings: () => request<SiteSettings>("/settings"),
  createLead: (payload: Omit<Lead, "id" | "createdAt">) =>
    request<Lead>("/leads", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  admin: {
    getServices: (token: string) =>
      request<Service[]>("/admin/services", {
        headers: { Authorization: `Bearer ${token}` }
      }),
    saveService: (token: string, payload: Service) =>
      request<Service>("/admin/services", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      }),
    deleteService: (token: string, id: string) =>
      request<{ success: boolean }>(`/admin/services/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      }),
    getLeads: (token: string) =>
      request<Lead[]>("/admin/leads", {
        headers: { Authorization: `Bearer ${token}` }
      }),
    getBlog: (token: string) =>
      request<BlogPost[]>("/admin/blog", {
        headers: { Authorization: `Bearer ${token}` }
      }),
    saveBlog: (token: string, payload: BlogPost) =>
      request<BlogPost>("/admin/blog", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      }),
    getPortfolio: (token: string) =>
      request<PortfolioItem[]>("/admin/portfolio", {
        headers: { Authorization: `Bearer ${token}` }
      }),
    savePortfolio: (token: string, payload: PortfolioItem) =>
      request<PortfolioItem>("/admin/portfolio", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      }),
    getSettings: (token: string) =>
      request<SiteSettings>("/admin/settings", {
        headers: { Authorization: `Bearer ${token}` }
      }),
    saveSettings: (token: string, payload: SiteSettings) =>
      request<SiteSettings>("/admin/settings", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      }),
    getLogos: (token: string) =>
      request<Logo[]>("/admin/logos", {
        headers: { Authorization: `Bearer ${token}` }
      }),
    saveLogo: (token: string, payload: Logo) =>
      request<Logo>("/admin/logos", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      })
  }
};
