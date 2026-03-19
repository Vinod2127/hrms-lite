// Base URL (works for both local & production)
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "";

// Common fetch wrapper
export async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    const message = data?.message || `API Error: ${response.status}`;
    throw new Error(message);
  }

  return data;
}
