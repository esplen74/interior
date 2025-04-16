db = db.getSiblingDB("noithatnhuy");
db.createCollection("categories");
db.categories.insertMany([
  { _id: 1, name: "Nội Thất Đồ Gỗ", image: "/images/category/1/background.jpg"},
  { _id: 2, name: "Nội Thất Nhựa Cao Cấp", image: "/images/category/2/background.jpg"},
  { _id: 3, name: "Đèn Trang Trí", image: "/images/category/3/background.jpg"},
  { _id: 4, name: "Quạt Trần Bốn Mùa" , image: "/images/category/4/background.jpg"},
  { _id: 5, name: "Két sắt", image: "/images/category/5/background.jpg"},
  { _id: 6, name: "Tủ Thờ" , image: "/images/category/6/background.jpg"},
  { _id: 7, name: "Bàn Ăn" , image: "/images/category/7/background.jpg"},
  { _id: 8, name: "Bàn Trang Điểm" , image: "/images/category/8/background.jpg"},
  { _id: 9, name: "Sofa" , image: "/images/category/9/background.jpg"},
  { _id: 10, name: "Giường" , image: "/images/category/10/background.jpg"}
]);
