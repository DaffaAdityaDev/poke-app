import useSWR, { SWRConfiguration, SWRResponse } from "swr";

import { createSWRConfig } from "@/config/swr";
import { fetcher } from "@/lib/api/fetcher";

// Custom hook that wraps SWR with pre-configured options
export function useSWRConfig<Data = any, Error = any>(
  key: string | null | string[],
  customConfig?: Partial<SWRConfiguration>,
): SWRResponse<Data, Error> {
  // Merge custom config with default SWR configuration
  const config = createSWRConfig(customConfig);

  // Use SWR hook with the merged config and a custom fetcher
  return useSWR<Data, Error>(key, fetcher, config);
}
