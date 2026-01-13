const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const authHeaders = () => {
  const token = localStorage.getItem("gmj_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "İstek başarısız oldu.");
  }
  return response.json() as Promise<T>;
};

export const adminApi = {
  async getDashboard() {
    return handleResponse(fetch(`${API_URL}/admin/summary`, { headers: authHeaders() }));
  },
  async saveService(payload: unknown) {
    return handleResponse(
      fetch(`${API_URL}/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(payload),
      })
    );
  },
  async updateService(id: string, payload: unknown) {
    return handleResponse(
      fetch(`${API_URL}/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(payload),
      })
    );
  },
  async deleteService(id: string) {
    return handleResponse(
      fetch(`${API_URL}/services/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      })
    );
  },
  async saveLogo(payload: unknown) {
    return handleResponse(
      fetch(`${API_URL}/logos`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(payload),
      })
    );
  },
  async updateLogo(id: string, payload: unknown) {
    return handleResponse(
      fetch(`${API_URL}/logos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(payload),
      })
    );
  },
  async deleteLogo(id: string) {
    return handleResponse(
      fetch(`${API_URL}/logos/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      })
    );
  },
  async savePortfolio(payload: unknown) {
    return handleResponse(
      fetch(`${API_URL}/portfolio`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(payload),
      })
    );
  },
  async updatePortfolio(id: string, payload: unknown) {
    return handleResponse(
      fetch(`${API_URL}/portfolio/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(payload),
      })
    );
  },
  async deletePortfolio(id: string) {
    return handleResponse(
      fetch(`${API_URL}/portfolio/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      })
    );
  },
  async saveBlog(payload: unknown) {
    return handleResponse(
      fetch(`${API_URL}/blog`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(payload),
      })
    );
  },
  async updateBlog(id: string, payload: unknown) {
    return handleResponse(
      fetch(`${API_URL}/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(payload),
      })
    );
  },
  async deleteBlog(id: string) {
    return handleResponse(
      fetch(`${API_URL}/blog/${id}`, {
        method: "DELETE",
        headers: authHeaders(),
      })
    );
  },
  async updateSettings(payload: unknown) {
    return handleResponse(
      fetch(`${API_URL}/settings`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(payload),
      })
    );
  },
  async getLeads() {
    return handleResponse(fetch(`${API_URL}/leads`, { headers: authHeaders() }));
  },
};
