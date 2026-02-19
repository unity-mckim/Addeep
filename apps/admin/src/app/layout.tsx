import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeProvider";
import QueryProvider from "./components/providers/query-provider";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Addeep Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <QueryProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
