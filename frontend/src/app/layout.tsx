import type { Metadata } from "next";
import "./globals.css";
import TitleBar from "../components/layout/TitleBar";
import Sidebar from "../components/layout/Sidebar";

export const metadata: Metadata = {
  title: "CPP",
  description: "Communication Platform for Programmers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-50">
        <div className="flex flex-col h-screen">
          <TitleBar />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-auto p-2">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
