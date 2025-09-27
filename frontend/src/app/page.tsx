'use client';

import { Header } from '@/components/layout';
import Hero from '@/components/home/Hero';
import { ScrollingTags } from '@/components/home';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import { Footer } from '@/components/layout';
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <ScrollingTags />
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  );
}
