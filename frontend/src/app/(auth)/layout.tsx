import type { Metadata } from "next";
import "../../app/globals.css";

export const metadata: Metadata = {
  title: "CPP",
  description: "Communication Platform for Programmers",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-50">
        <main className="min-h-screen flex items-center justify-center h-screen p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
