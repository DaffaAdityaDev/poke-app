import type { AppProps } from "next/app";

import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/router";
import { SWRConfig } from "swr";

import { fontSans, fontMono } from "@/config/fonts";
import "@/styles/globals.css";
import { swrConfig } from "@/config/swr";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <SWRConfig value={swrConfig}>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider>
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
