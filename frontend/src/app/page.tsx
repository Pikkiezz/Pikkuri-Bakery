'use client';

import { Header } from '@/components/layout';
import Hero from '@/components/home/Hero';
import ScrollingTags from '@/components/shared/ScrollingTags';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Categories from '@/components/home/Categories';
import { Footer } from '@/components/layout';
import { API_CONFIG, apiClient } from '@/config/api';
import { useEffect, useState } from 'react';

const getProducts = async () => {
  
  const products = await apiClient.get(API_CONFIG.ENDPOINTS.PRODUCTS.LIST);
  console.log(products);
}

export default function Home() {
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <ScrollingTags />
        <FeaturedProducts />
        <Categories />
      </main>
      <Footer />
    </div>
  );
}
