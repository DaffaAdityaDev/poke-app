import useSWR, { SWRConfiguration, SWRResponse } from "swr";

import { createSWRConfig } from "@/config/swr";
import { fetcher } from "@/lib/api/fetcher";

export function useSWRConfig<Data = any, Error = any>(
  key: string | null | string[],
  customConfig?: Partial<SWRConfiguration>,
): SWRResponse<Data, Error> {
  const config = createSWRConfig(customConfig);

  return useSWR<Data, Error>(key, fetcher, config);
}
