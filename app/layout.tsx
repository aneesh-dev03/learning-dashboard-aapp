import type { Metadata } from "next";
import "./globals.css";

// TODO: add og image later
export const metadata: Metadata = {
  title: "Learnspace",
  description: "your personal learning dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      {/* min-h-screen here so short pages don't look broken */}
      <body className="min-h-screen bg-[#080b12] text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
