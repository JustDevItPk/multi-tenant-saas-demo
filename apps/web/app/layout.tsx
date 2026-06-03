import type { Metadata } from "next";
// @ts-expect-error CSS module declaration is provided by Next.js at runtime.
import "./globals.css";

export const metadata: Metadata = {
  title: "Multi-Tenant SaaS Demo",
  description: "Demo project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}