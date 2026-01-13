import { Service, Logo, Portfolio, BlogPost, Lead, Settings } from "./types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "İstek başarısız oldu.");
  }
  return response.json() as Promise<T>;
};

export const api = {
  async getServices(): Promise<Service[]> {
    return handleResponse(fetch(`${API_URL}/services`));
  },
  async getService(slug: string): Promise<Service> {
    return handleResponse(fetch(`${API_URL}/services/${slug}`));
  },
  async getLogos(): Promise<Logo[]> {
    return handleResponse(fetch(`${API_URL}/logos`));
  },
  async getPortfolio(): Promise<Portfolio[]> {
    return handleResponse(fetch(`${API_URL}/portfolio`));
  },
  async getPortfolioItem(slug: string): Promise<Portfolio> {
    return handleResponse(fetch(`${API_URL}/portfolio/${slug}`));
  },
  async getBlog(): Promise<BlogPost[]> {
    return handleResponse(fetch(`${API_URL}/blog`));
  },
  async getBlogPost(slug: string): Promise<BlogPost> {
    return handleResponse(fetch(`${API_URL}/blog/${slug}`));
  },
  async getSettings(): Promise<Settings> {
    return handleResponse(fetch(`${API_URL}/settings`));
  },
  async submitLead(payload: Omit<Lead, "id" | "createdAt">): Promise<Lead> {
    return handleResponse(
      fetch(`${API_URL}/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
    );
  },
};
