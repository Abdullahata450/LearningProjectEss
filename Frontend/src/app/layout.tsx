// src/app/layout.tsx
import type { Metadata } from "next";
import './globals.css';
import SessionsProvider from "@/Components/SessionProvider";
export const metadata: Metadata = {
  title: "My App",
  description: "Next.js + NextAuth + Zustand",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionsProvider>
        {children}
        </SessionsProvider>
        </body>
    </html>
  );
}
