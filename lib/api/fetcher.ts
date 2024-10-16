import { API_BASE_URL } from "@/utils/api";

// Generic fetcher function that can handle single or multiple URLs
export const fetcher = async <T>(
  input: RequestInfo | RequestInfo[],
): Promise<T> => {
  // Helper function to fetch data
  const fetchSingle = async (url: string) => {
    const fullUrl = url.startsWith("http") ? url : `${API_BASE_URL}${url}`;
    const res = await fetch(fullUrl);

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    return res.json();
  };

  if (Array.isArray(input)) {
    return Promise.all(
      input.map((url) => fetchSingle(url.toString())),
    ) as Promise<T>;
  } else {
    return fetchSingle(input.toString()) as Promise<T>;
  }
};
