import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flowa × NexBiz — La Super-App IA pour PME Africaines",
  description:
    "Flowa × NexBiz: le CFO IA + l'Agent Commercial IA pour les PME africaines. NexBiz génère les ventes, Flowa transforme les ventes en cashflow, l'IA optimise tout.",
  keywords: [
    "Flowa",
    "NexBiz",
    "Super App",
    "IA",
    "PME",
    "Afrique",
    "trésorerie",
    "CRM",
    "WhatsApp",
    "Orange Money",
    "recouvrement",
    "comptabilité vocale",
    "micro-crédit",
    "OSC 2026",
  ],
  authors: [{ name: "Flowa × NexBiz — OSC 2026" }],
  icons: {
    icon: "/logo-orange.svg",
  },
  openGraph: {
    title: "Flowa × NexBiz — La Super-App IA pour PME Africaines",
    description:
      "NexBiz génère les ventes. Flowa transforme les ventes en cashflow. L'IA optimise tout. L'écosystème complet pour les PME africaines.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
