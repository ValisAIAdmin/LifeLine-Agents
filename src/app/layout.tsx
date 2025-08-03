import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LifeLine Agents - Celestial Intelligence Platform",
  description: "Advanced AI agents constellation for strategic decision making and intelligent assistance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
