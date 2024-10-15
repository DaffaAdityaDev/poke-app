import useSWR, { SWRConfiguration } from "swr";

import { fetchData } from "@/utils/api";

export function useSwrFetch<T>(url: string | null, config?: SWRConfiguration) {
  const { data, error, isLoading, mutate } = useSWR<T>(url, fetchData, {
    ...config,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading,
    mutate,
  };
}
