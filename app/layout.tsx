'use client'
import { ThemeProvider } from "@/components/theme-provider";
import { QueryClient, QueryClientProvider } from "react-query";
import "./globals.css";
import type { Metadata } from "next";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "Project Validation Workflow",
  description: "Workflow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Sidebar children={children} />
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
