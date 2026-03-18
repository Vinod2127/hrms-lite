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

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}
