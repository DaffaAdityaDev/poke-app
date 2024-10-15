import { SWRConfiguration } from "swr";
import { toast } from "react-toastify";

export const swrConfig: SWRConfiguration = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: (error) => {
    if (
      error.name === "NetworkError" ||
      (error.status >= 500 && error.status < 600)
    ) {
      return true;
    }
    if (error.status === 404) {
      return false;
    }

    return true;
  },
  errorRetryInterval: 5000,
  errorRetryCount: 3,
  onError: (error, key) => {
    // Global error handler
    toast.error(
      `An error occurred while fetching data. Please try again later.`,
    );
    console.error(`SWR Error for ${key}:`, error);
  },
};

export const createSWRConfig = (
  customConfig: Partial<SWRConfiguration> = {},
): SWRConfiguration => ({
  ...swrConfig,
  ...customConfig,
});
