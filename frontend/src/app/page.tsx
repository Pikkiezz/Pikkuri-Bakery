'use client';

import { Header } from '@/components/layout';
import Hero from '@/components/home/Hero';
import ScrollingTags from '@/components/shared/ScrollingTags';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Categories from '@/components/home/Categories';
import { Footer } from '@/components/layout';
import { API_CONFIG, apiClient } from '@/config/api';
import { useEffect, useState } from 'react';

const payload = {
  "name": "MacBook Air M2",
  "description": "Lightweight laptop with M2 chip",
  "price": 45000,
  "stock": 1,
  "categoryId": 1,
  "createdById": 1
}

const getProducts = async () => {
  const products = await apiClient.get<any>(API_CONFIG.ENDPOINTS.PRODUCTS.LIST);
  console.log(products);
}

const testPostProduct = async () => {
  const res = await apiClient.post<any>(API_CONFIG.ENDPOINTS.PRODUCTS.LIST, payload);
  console.log(res);
}

export default function Home() {
  useEffect(() => {
    testPostProduct();
    // getProducts();
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
