// "use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Script from "next/script"; // Import Script từ Next.js
import "bootstrap/dist/css/bootstrap.min.css"; // Import CSS của Bootstrap


export default function Header() {
  

  return (
    <header id="mainHeader">
      <Script src="../js/bootstrap.bundle.min.js" strategy="lazyOnload" />

      <div className="top-bar text-white py-2">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <span className="top-info-item">
                Hotline:{" "}
                <a href="tel:0935888509" className="text-white">
                  0935 888 509
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          <div className="d-flex align-items-center my-3 my-sm-0">
            <a href="/">
              <img src="/images/logo.jpg" alt="logo" className="item-logo" loading="lazy" />
            </a>
          </div>
          <a className="navbar-brand" href="/">NỘI THẤT NHƯ Ý</a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="">
                <a className="nav-link active" href="/">Trang Chủ</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href={`/category`}>Danh mục</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" href={`/introduce`}>Giới thiệu</Link>
              </li>

              <li className="nav-item">
                <a className="nav-link text-decoration-underline yeucau" href="https://zalo.me/0935888509">
                  NHẬN LÀM NỘI THẤT THEO YÊU CẦU
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}