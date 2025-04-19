"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

interface CategoryType {
  id: number;
  name: string;
  image: string;
}

export default function Home() {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const imageBaseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '');

  useEffect(() => {
    const fetchData = async () => {
      const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
      const categoriesData = await categoriesRes.json();
      setCategories(categoriesData);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Danh Mục Sản Phẩm</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {categories.map((item) => (
            <div
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 bg-white"
              key={item.id}
            >
              <Link
                href={`/product?category=${item.id}`}
                scroll={true}
                className="block"
              >
                <div className="aspect-w-16 aspect-h-9 w-full h-48 overflow-hidden">
                  <img
                    src={`${imageBaseUrl}${item.image}`}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h2 className="text-xl font-bold text-white text-center">
                    {item.name}
                  </h2>
                  <div className="flex justify-center mt-2">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-500 rounded-full">
                      Xem sản phẩm
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}