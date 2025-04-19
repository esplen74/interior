"use client";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "@/app/components/header";
import Footer from "@/app/components/footer";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Nội Thất Như Ý</title>
        <meta
          name="description"
          content="Chuyên nội thất như ý cao cấp Quảng Nam, Đà Nẵng, Hội An"
        />
        <link
          rel="icon"
          href="/images/logo.jpg"
          sizes="32x32"
          type="image/png"
        />
        <link
          rel="icon"
          href="/images/logo.jpg"
          sizes="16x16"
          type="image/png"
        />
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="author" content="" />
        <meta name="grammarly" content="false" />
        <meta
          name="description"
          content="Nội Thất Như Ý - Cung cấp các sản phẩm nội thất sang trọng, chất lượng cao như sofa, giường, đèn trang trí, và nhiều hơn nữa."
        />
        <meta
          name="keywords"
          content="nội thất như ý, sofa, giường, đèn trang trí, nội thất gỗ, nội thất nhựa cao cấp, bàn ăn, tủ thờ, két sắt"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css"
        />
        <script
          src="https://code.jquery.com/jquery-3.6.0.min.js"
          defer
        ></script>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
          rel="stylesheet"
        ></link>
      </head>
      <body>
        <Header />
        <div className="pt-35 md:pt-20"></div>
        <div className="fixed-right-icons">
          <a
            href="https://zalo.me/0935888509"
            target="_blank"
            className="zalo-icon"
          >
            <img src="/images/zalo.jpg" alt="Zalo" width="50" />
          </a>
          <a
            href="https://www.facebook.com/share/1E6MydqxKd/?mibextid=wwXIfr"
            className="phone-icon"
          >
            <img src="/images/facebook.png" alt="Phone" width="50" />
          </a>
          <a href="tel:0935888509" className="phone-icon">
            <img src="/images/phone.png" alt="Phone" width="50" />
          </a>
        </div>
        <main>{children}</main>
        <Toaster
          position="top-right"
          offset={110}
          theme="light"
          toastOptions={{
            classNames: {

              toast: "group-[.toast]:bg-background",
              success: "!bg-green-600 !text-white border-0",
              error: "!bg-red-600 !text-white border-0",
              title: "!text-white font-bold",
              description: "!text-white/80",
              actionButton: "!bg-white !text-green-600",
              cancelButton: "!bg-white !text-red-600",
            },
          }}
        />
        <Footer></Footer>
      </body>
    </html>
  );
}
