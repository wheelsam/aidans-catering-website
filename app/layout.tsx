import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aidan Collins | Luxury Wedding Charcuterie & Catering | Seattle",
  description: "Elevate your Seattle wedding or special event with handcrafted charcuterie boards, grazing tables, and luxury catering. 6 years fine dining experience. Serving up to 200 guests. Custom menus for weddings, corporate events, and private dinners.",
  keywords: "wedding catering Seattle, charcuterie boards Seattle, grazing tables, luxury catering, wedding food, Seattle caterer, fine dining catering, cocktail reception, private events",
  openGraph: {
    title: "Aidan Collins | Luxury Wedding Charcuterie",
    description: "Handcrafted charcuterie boards and grazing tables for Seattle weddings and special events",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-sans antialiased bg-cream text-charcoal">
        {children}
      </body>
    </html>
  );
}
