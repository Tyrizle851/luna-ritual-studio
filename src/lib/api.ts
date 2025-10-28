export const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

export async function apiFetch(path: string, init?: RequestInit) {
  const url = `${API_BASE}${path}`;
  return fetch(url, init);
}


