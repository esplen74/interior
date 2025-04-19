"use client";

import { changeBackgroundImage } from "../Utils/helpers.js";
import { useEffect, useState, useMemo } from "react";
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
export function Background() {
  useEffect(() => {
    changeBackgroundImage();
  });
  return <section className="background-section"></section>;
}

export function HotProduct() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const imageBaseUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "");

  useEffect(() => {
    const fetchData = async () => {
      const productsRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products`
      );
      const productsData = await productsRes.json();
      setProducts(productsData);
    };
    fetchData();
  }, []);

  const hotProduct = useMemo(() => {
    return products.filter((item) => item.hot === true);
  }, [products]);

  useEffect(() => {
    setFilteredProducts(hotProduct);
  }, [hotProduct]);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredProducts(hotProduct);
    } else {
      const searchResult = hotProduct.filter((item) =>
        item.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(searchResult);
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header with search */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-800">
              Sản Phẩm Bán Chạy
            </h2>
            <p className="text-gray-600 mt-2">
              Những sản phẩm được ưa chuộng nhất
            </p>
          </div>

          <div className="flex w-full md:w-auto">
            <div className="relative flex-grow md:flex-grow-0 md:w-64 lg:w-80">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r-lg transition duration-300 flex items-center"
                onClick={handleSearch}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Tìm kiếm
              </button>
            </div>
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
            >
              {/* Product image with fixed aspect ratio */}
              <div className="relative overflow-hidden pt-[100%]">
                <figure className="absolute inset-0 m-0">
                  <a
                    href={`/product?category=${item.categoryId}`}
                    className="block w-full h-full"
                  >
                    <img
                      src={`${imageBaseUrl}${item.image}`}
                      alt={item.productName}
                      className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </a>
                </figure>
                {item.hot && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    HOT
                  </div>
                )}
              </div>

              {/* Product info */}
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-1">
                  {item.productName}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
                  {item.description}
                </p>

                {/* Price section - Đã sửa để không dùng saleFlg */}
                <div className="mb-3">
                  {item.amountSale && item.amountSale < item.amount ? (
                    <>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-sm line-through">
                          {item.amount.toLocaleString()} VNĐ
                        </span>
                        <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded">
                          Giảm{" "}
                          {Math.round(
                            (1 - item.amountSale / item.amount) * 100
                          )}
                          %
                        </span>
                      </div>
                      <div className="text-xl font-bold text-orange-500">
                        {item.amountSale.toLocaleString()} VNĐ
                      </div>
                    </>
                  ) : (
                    <div className="text-xl font-bold text-gray-800">
                      {item.amount.toLocaleString()} VNĐ
                    </div>
                  )}
                </div>

                {/* Contact button */}
                <a
                  href="https://zalo.me/0935888509"
                  className="w-full flex items-center justify-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition duration-300 mt-auto text-sm md:text-base whitespace-nowrap"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5 mr-1 md:mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                    <path d="M13 7h-2v5.414l3.293 3.293 1.414-1.414L13 11.586z" />
                  </svg>
                  Liên hệ ngay
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">
              Không tìm thấy sản phẩm
            </h3>
            <p className="mt-1 text-gray-500">
              Không có sản phẩm nào phù hợp với từ khóa tìm kiếm của bạn.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export function AboutUs() {
  return (
    <div>
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-6 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Hình ảnh cửa hàng */}
            <div className="relative">
              <img
                src="/images/background_1.jpg"
                alt="Cửa hàng nội thất"
                className="rounded-2xl shadow-lg w-full h-auto object-cover"
              />
              <div className="absolute top-5 left-5 bg-orange-500 text-white px-4 py-2 rounded-md text-sm font-semibold">
                Chất lượng hàng đầu
              </div>
            </div>

            {/* Nội dung giới thiệu */}
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Giới thiệu về{" "}
                <span className="text-orange-500">Nội Thất Như Ý</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Chúng tôi chuyên cung cấp các sản phẩm nội thất cao cấp, đa dạng
                mẫu mã, đáp ứng mọi nhu cầu trang trí nhà ở, văn phòng,
                showroom. Với chất liệu bền đẹp, thiết kế hiện đại, chúng tôi
                cam kết mang đến sự hài lòng cho khách hàng.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Hãy ghé thăm cửa hàng của chúng tôi để trải nghiệm những sản
                phẩm tinh tế nhất!
              </p>
              <a
                href="https://zalo.me/0935888509"
                className="bg-orange-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition duration-300"
              >
                Liên hệ ngay
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-4 my-4">
        <div className="container-lg">
          <div className="rounded-5">
            <div className="container">
              <div className="row justify-content-center align-items-center">
                <div className="col-md-12">
                  <h2 className="text-center mt-3">Địa chỉ của chúng tôi</h2>
                  <div className="map-container mt-4">
                    <iframe
                      src="https://maps.google.com/maps?q=N%E1%BB%98I+TH%E1%BA%A4T+NH%C6%AF+%C3%9D%2C+QL1a%2C+%C4%90i%E1%BB%87n+Minh%2C+%C4%90i%E1%BB%87n+B%C3%A0n%2C+Qu%E1%BA%A3ng+Nam&t=&z=15&ie=UTF8&iwloc=&output=embed"
                      width="100%"
                      height="350"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      sandbox="allow-scripts allow-same-origin allow-popups"
                      aria-label="Google Maps Location of NỘI THẤT NHƯ Ý"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setError("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setSuccess("Gửi liên hệ thành công.");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setError("Gửi thất bại. Vui lòng thử lại.");
      }
    } catch (error) {
      setError("Lỗi hệ thống.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg p-5 mt-10 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        📞 Liên Hệ Với Chúng Tôi
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-gray-600 text-sm">Tên của bạn</label>
          <input
            type="text"
            placeholder="Nhập tên..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-600 text-sm">Email</label>
          <input
            type="email"
            placeholder="Nhập email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-600 text-sm">Nội dung</label>
          <textarea
            placeholder="Nhập nội dung..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-sm focus:ring-2 focus:ring-orange-500"
          ></textarea>
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-2">{success}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full px-3 py-2 rounded-md text-sm transition duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600 text-white"
          }`}
        >
          {loading ? "Đang gửi..." : "✉ Gửi Liên Hệ"}
        </button>
      </form>
    </div>
  );
}
