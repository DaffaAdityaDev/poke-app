import { Link } from "@nextui-org/link";

import { Head } from "./head";

import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Head />
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full flex items-center justify-center py-3">
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Created by{" "}
            <Link
              isExternal
              className="text-primary hover:underline"
              href="https://github.com/DaffaAdityaDev"
            >
              Daffa Aditya Rahman
            </Link>
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Powered by{" "}
            <Link
              isExternal
              className="text-primary hover:underline"
              href="https://nextui.org"
            >
              NextUI
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
