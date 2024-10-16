import { Html, Head, Main, NextScript } from "next/document";
import clsx from "clsx";

import { fontSans } from "@/config/fonts";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body
        className={clsx(
          // Apply base styles to the body
          "min-h-screen bg-background font-sans antialiased",
          // Include custom font variable
          fontSans.variable,
        )}
      >
        {/* Main content of the application */}
        <Main />
        {/* Next.js scripts */}
        <NextScript />
      </body>
    </Html>
  );
}
