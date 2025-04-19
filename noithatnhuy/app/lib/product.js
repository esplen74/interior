// Lấy các phần tử cần thiết
const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const closeBtn = document.querySelector(".close");
const galleryImages = document.querySelectorAll(".gallery-image");
const header = document.getElementById("mainHeader"); // Lấy header

// Mở modal và hiển thị hình ảnh phóng to, đồng thời ẩn header
galleryImages.forEach((image) => {
  image.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = image.src;

    // Điều chỉnh kích thước hình ảnh trên mobile
    if (window.innerWidth <= 768) {
      modalImg.style.width = "100%"; /* Chiếm toàn bộ chiều rộng màn hình */
      modalImg.style.height = "auto"; /* Tự động điều chỉnh chiều cao */
      
    } else {
      modalImg.style.width = "auto";
      modalImg.style.height = "auto";
      modalImg.style.maxWidth = "90%";
      modalImg.style.maxHeight = "90vh";
    }

    header.style.display = "none"; // Ẩn header
  });
});

// Đóng modal và hiển thị lại header
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  header.style.display = "block"; // Hiển thị lại header
});

// Đóng modal và hiển thị lại header khi click bên ngoài hình ảnh
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    header.style.display = "block"; // Hiển thị lại header
  }
});