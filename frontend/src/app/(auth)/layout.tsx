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
      <body className="text-zinc-50 h-screen">
        <main
          className="relative min-h-screen flex items-center justify-center h-screen p-4 bg-cover bg-center"
          style={{ backgroundImage: "url('/bg-login.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/50 z-0" />
          <div className="relative z-10">{children}</div>
        </main>
      </body>
    </html>
  );
}
