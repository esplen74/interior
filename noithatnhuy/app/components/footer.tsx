import Link from "next/link";

function footer() {
  return (
    <footer className="py-2 pb-0 !important">
    <div className="container-lg">
      <div className="row">
        <div className="col-lg-4 col-md-6 col-sm-6">
          <div className="footer-menu">
            <div className="logo-info">
              <img
                src="/images/logo.jpg"
                width="100px"
                height="auto"
                alt="logo"
              />
              <div className="logo-text">
                <h5 className="footer-title">Nội Thất Như Ý</h5>
                <p className="footer-title">
                  Địa chỉ: QL1A, Điện Minh, Điện Bàn, Quảng Nam
                </p>
              </div>
            </div>
            <div className="col-md-12 mb-3">
              <div className="social-icons">
                <a
                  href="https://www.facebook.com/share/5cMAciNrevgEB14Z/?mibextid=wwXIfr"
                  target="_blank"
                  className="social-icon"
                >
                  <i className="fa-brands fa-facebook icon"></i>
                </a>
                <a
                  href="https://www.tiktok.com/@italala.hi"
                  target="_blank"
                  className="social-icon"
                >
                  <i className="fa-brands fa-tiktok icon"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-2 col-sm-6">
          <div className="footer-menu">
            <h5 className="widget-title">Danh Mục</h5>
            <ul className="menu-list list-unstyled">
              <li className="menu-item">
                <a className="nav-link">
                  Ghế sofa
                </a>
              </li>
              <li className="menu-item">
                <a  className="nav-link">
                  Các loại giường
                </a>
              </li>
              <li className="menu-item">
                <a  className="nav-link">
                  Đèn trang trí
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-md-2 col-sm-6">
          <div className="footer-menu">
            <h5 className="widget-title">Dịch Vụ</h5>
            <ul className="menu-list list-unstyled">
              <li className="menu-item">
                <a className="nav-link">Giường nỉ theo yêu cầu</a>
              </li>
              <li className="menu-item">
                <a className="nav-link">Nội thất theo yêu cầu</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="col-md-2 col-sm-6">
          <div className="footer-menu">
            <h5 className="widget-title">Hình Ảnh Cửa Hàng</h5>
            <ul className="menu-list list-unstyled">
              <li className="menu-item">
              <Link className="nav-link" href={`/introduce`}>Giới thiệu</Link>
              </li>
              <Link className="nav-link" href={`/admin`}>Admin</Link>
            </ul>
          </div>
        </div>
      </div>
      <div className="">
        <div className="row">
          <div className="copyright">
            <p>© 2025 NoiThatNhuY. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
  )
}

export default footer