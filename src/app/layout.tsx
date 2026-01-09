import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NusaLiving AI - Rencanakan Hunian Masa Depan",
  description: "Platform cerdas untuk membantu masyarakat Indonesia merencanakan hunian yang aman, berkelanjutan, dan siap pembiayaan.",
};

import { AuthProvider } from "@/context/auth-context"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
