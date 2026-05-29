import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import WeatherCanvas from "@/components/WeatherCanvas";
import ScrollReveal from "@/components/ScrollReveal";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Amenda Maria Johnson — Product Designer",
  description:
    "Product Designer crafting scalable digital experiences across AI, healthcare, and learning platforms — turning complexity into clarity.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body>
        <Header />
        
        {children}
        
        <Footer />
        
        <WeatherCanvas />
        <CustomCursor />
        <ScrollReveal />
      </body>
    </html>
  );
}

