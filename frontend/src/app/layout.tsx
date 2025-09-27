import type { Metadata } from "next";
import { Fredoka, Quicksand, Poppins } from "next/font/google";
import "./globals.css";
import { CartProvider, FilterProvider, ProductProvider, CategoryProvider } from '@/contexts';
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
  title: "Pikkuri Bakery - Fresh Baked Goods & Artisanal Coffee",
  description: "Discover fresh baked goods and artisanal coffee crafted with love. Elevate your morning experience with Pikkuri Bakery.",
  keywords: "bakery, coffee, croissants, bread, pastries, artisanal, fresh, Pikkuri Bakery",
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
                  <AuthProvider>
                    <CategoryProvider>
                      <ProductProvider>
                        <FilterProvider>
                          <CartProvider>
                            <ProfileProvider>
                              {children}
                            </ProfileProvider>
                          </CartProvider>
                        </FilterProvider>
                      </ProductProvider>
                    </CategoryProvider>
                  </AuthProvider>
          </body>
        </html>
  );
}
