// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import SessionsProvider from "@/Components/SessionProvider";
import { ThemeModeProvider } from "@/theme/ThemeContext";

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
          <ThemeModeProvider>{children}</ThemeModeProvider>
        </SessionsProvider>
      </body>
    </html>
  );
}
