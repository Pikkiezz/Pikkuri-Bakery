'use client';

import { Header } from '@/components/layout';
import Hero from '@/components/home/Hero';
import ScrollingTags from '@/components/shared/ScrollingTags';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Categories from '@/components/home/Categories';
import { Footer } from '@/components/layout';
import { API_CONFIG, apiClient } from '@/config/api';
import { useEffect, useState } from 'react';
import type { ProductsResponse, CreateProductBody } from '@/types';

const payload: CreateProductBody = {
  name: "MacBook Air M2",
  description: "Lightweight laptop with M2 chip",
  price: 45000,
  stock: 1,
  categoryId: 1,
  createdById: 1
}

const getProducts = async () => {
  const response = await apiClient.get<ProductsResponse>(API_CONFIG.ENDPOINTS.PRODUCTS.LIST);
  console.log(response);
}

const testPostProduct = async () => {
  const response = await apiClient.post(API_CONFIG.ENDPOINTS.PRODUCTS.LIST, payload);
  console.log(response);
}

export default function Home() {
  useEffect(() => {
    // testPostProduct();
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
