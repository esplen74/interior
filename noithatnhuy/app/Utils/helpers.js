export function changeBackgroundImage() {
  if (typeof window === "undefined") return; // Chỉ chạy trên client-side

  (function ($) {
    "use strict";

    if (typeof $ === "undefined") return; // Kiểm tra jQuery có được load không

    var initPreloader = function () {
      $(document).ready(function ($) {
        var Body = $("body");
        Body.addClass("preloader-site");
      });

      $(window).on("load", function () {
        $(".preloader-wrapper").fadeOut();
        $("body").removeClass("preloader-site");
      });
    };

    let images = [
      "images/background_1.jpg",
      "images/background_2.jpg",
      "images/background_3.jpg",
      "images/background_4.jpg",
    ]; // Các ảnh nền của bạn

    let currentImageIndex = 0;
    let intervalId = null;

    function changeBackgroundImage() {
      const bgElement = document.querySelector(".background-section");

      if (!bgElement) return; // Ngăn lỗi khi phần tử không tồn tại

      bgElement.style.backgroundImage = `url('${images[currentImageIndex]}')`;
    }

    function nextImage() {
      currentImageIndex = (currentImageIndex + 1) % images.length;
      changeBackgroundImage();
    }

    function previousImage() {
      currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
      changeBackgroundImage();
    }

    // Đặt ID cho interval để có thể clear khi unmount
    intervalId = setInterval(nextImage, 5000);

    changeBackgroundImage(); // Hiển thị ảnh đầu tiên khi tải trang

    // Cleanup khi chuyển trang
    window.addEventListener("beforeunload", () => {
      clearInterval(intervalId);
    });

    $(document).ready(function () {
      initPreloader();
    });
  })(jQuery);
}

export function setupImageModal() {
  if (typeof window === "undefined") return; // Đảm bảo chạy trên client

  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".close");
  const galleryImages = document.querySelectorAll(".gallery-image");
  const header = document.getElementById("mainHeader");

  if (!modal || !modalImg || !closeBtn || galleryImages.length === 0) {
    return;
  }

  // Mở modal
  galleryImages.forEach((image) => {
    image.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = image.src;
      header.style.display = "none";

      if (window.innerWidth <= 768) {
        modalImg.style.width = "100%";
        modalImg.style.height = "auto";
      } else {
        modalImg.style.width = "auto";
        modalImg.style.height = "auto";
        modalImg.style.maxWidth = "90%";
        modalImg.style.maxHeight = "90vh";
      }
    });
  });

  // Đóng modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
    header.style.display = "block";
  });

  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
      header.style.display = "block";
    }
  });
}

