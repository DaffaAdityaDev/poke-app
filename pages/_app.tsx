import type { AppProps } from "next/app";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";
import { swrConfig } from "@/config/swr";

// Main App component
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    // Set up SWR for data fetching
    <SWRConfig value={swrConfig}>
      {/* Set up NextUI provider with navigation */}
      <NextUIProvider navigate={router.push}>
        {/* Set up theme provider */}
        <NextThemesProvider>
          {/* Render the current page component */}
          <Component {...pageProps} />
        </NextThemesProvider>
      </NextUIProvider>
    </SWRConfig>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};
