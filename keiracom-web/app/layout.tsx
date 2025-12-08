import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Keiracom - Engine Control Center",
  description: "The Bloomberg Terminal for SEO - Automated Hedge Fund for Organic Search.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.variable} ${jetbrains.variable} antialiased font-sans`}
          suppressHydrationWarning
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

