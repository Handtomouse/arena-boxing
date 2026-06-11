import type { Metadata } from "next";
import { Bebas_Neue, Cormorant_Garamond, Barlow_Semi_Condensed } from "next/font/google";
import "./location.css";

export const metadata: Metadata = {
  title: "Find Us",
  description:
    "123 Campbell Parade, Bondi Beach NSW. Get directions, hours, transport options, and contact details for Arena Boxing Bondi.",
};

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-loc-display",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-loc-serif",
  display: "swap",
});

const barlow = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-loc-ui",
  display: "swap",
});

export default function LocationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${bebasNeue.variable} ${cormorant.variable} ${barlow.variable}`}>
      {children}
    </div>
  );
}
