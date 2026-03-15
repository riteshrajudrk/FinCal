import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinCal Goal-Based Investment Calculator",
  description:
    "Educational SIP calculator for understanding how monthly investing can help reach long-term financial goals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
