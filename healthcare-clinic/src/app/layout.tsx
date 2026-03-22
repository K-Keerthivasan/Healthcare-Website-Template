import type { Metadata } from "next";
import { DM_Serif_Display, Nunito } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const headingFont = DM_Serif_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
});

const bodyFont = Nunito({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "Harbor Health Clinic",
    template: "%s | Harbor Health Clinic",
  },
  description:
    "Premium healthcare and clinic website boilerplate for K2 Digital Media.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full bg-background antialiased", bodyFont.variable, headingFont.variable)}
    >
      <body className="min-h-full bg-background font-sans text-foreground">{children}</body>
    </html>
  );
}
