import useSWR, { SWRConfiguration } from "swr";

import { fetchData } from "@/utils/api";

// Custom hook for data fetching using SWR
export function useSwrFetch<T>(url: string | null, config?: SWRConfiguration) {
  // Use SWR hook with custom configuration
  const { data, error, isLoading, mutate } = useSWR<T>(url, fetchData, {
    ...config,
    // Disable automatic revalidation on window focus and network reconnection
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // Return an object with SWR's state and utilities
  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
