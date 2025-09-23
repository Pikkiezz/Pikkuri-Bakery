import type { Metadata } from "next";
import { Fredoka, Quicksand, Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider, FilterProvider } from '@/contexts';
import { ProfileProvider } from '@/contexts/ProfileContext';
import { AuthProvider } from '@/contexts/AuthContext';

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Pikkuri - Premium Spice Blends & Herb Mixes",
  description: "Discover original spice blends and herb mixes suitable for both home and professional cooking. Elevate your culinary experience with Pikkuri.",
  keywords: "spices, herbs, spice blends, seasoning, gourmet, cooking, culinary, Pikkuri",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="en">
          <body
            className={`${fredoka.variable} ${quicksand.variable} ${poppins.variable} antialiased bg-white`}
          >
            <FilterProvider>
              <AuthProvider>
                <CartProvider>
                  <ProfileProvider>
                    {children}
                  </ProfileProvider>
                </CartProvider>
              </AuthProvider>
            </FilterProvider>
          </body>
        </html>
  );
}
