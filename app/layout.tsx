import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";

export const metadata: Metadata = {
  title: "Arena Boxing Bondi | Those Who Dare",
  description: "Bondi's premier combat sports experience. Gothic fight culture meets boutique boxing. Those who dare, enter the arena.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Navigation />
        <main className="pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
