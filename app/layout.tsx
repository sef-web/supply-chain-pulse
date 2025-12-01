import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SupplyChain Pulse",
  description: "B2B Logistics Analytics Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen overflow-hidden bg-slate-50">
          
          {/* Sidebar Area: Notice we removed "w-64". 
              The Sidebar component now controls its own width 
              using the "w-16" or "w-64" classes internally. */}
          <aside className="hidden md:block flex-shrink-0 bg-white z-20">
            <Sidebar />
          </aside>

          {/* Main Content */}
          <div className="flex flex-1 flex-col overflow-hidden relative z-10">
            <Header />
            <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
              {children}
            </main>
          </div>
          
        </div>
      </body>
    </html>
  );
}