"use client";
import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { setupImageModal } from "../Utils/helpers.js";

interface ProductType {
  id: number;
  productName: string;
  image: string;
  categoryId: number;
  hot: boolean;
  amount: number;
  saleFlg: number;
  amountSale: number;
  description: string;
}

interface CategoryType {
  id: number;
  name: string;
}

export default function Home() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const searchParams = useSearchParams();

  const categoryIdParam = searchParams.get("category");
  const categoryId = categoryIdParam ? Number(categoryIdParam) : null;
  const categoryName = categories.find((p) => p.id === categoryId) || null;
  const imageBaseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '');

  // Fetch dữ liệu từ API khi component render
  useEffect(() => {
    const fetchData = async () => {
      const [productsRes, categoriesRes] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`),
      ]);
      const productsData = await productsRes.json();
      const categoriesData = await categoriesRes.json();
      console.log("API:", process.env.NEXT_PUBLIC_API_URL);

      setProducts(productsData);
      setCategories(categoriesData);
    };

    fetchData();
  }, []);

  // Lọc sản phẩm theo categoryId từ URL
  const filteredProducts = useMemo(() => {
    return products.filter((p) => p.categoryId === categoryId); // Sử dụng categoryId từ URL
  }, [categoryId, products]);

  useEffect(() => {
    // Gọi setupImageModal khi dữ liệu đã có và component được render
    if (products.length > 0 && categories.length > 0) {
      setupImageModal();
    }
  }, [products, categories]);

  return (
    <div>
      <h2 className="text-3xl font-bold text-orange-600 relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-1 after:bg-orange-400 after:transition-all after:duration-300 hover:after:h-2">
        Sản Phẩm {categoryName ? categoryName.name : ""}
      </h2>

      <div className="gallery">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <img
              key={p.id}
              src={`${imageBaseUrl}${p.image}`}
              alt={p.productName}
              className="gallery-image"
            />
          ))
        ) : (
          <p>Không có sản phẩm nào trong danh mục này.</p>
        )}
      </div>

      <div id="imageModal" className="modal">
        <span className="close">&times;</span>
        <img className="modal-content" id="modalImage" />
      </div>
    </div>
  );
}
