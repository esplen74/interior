db = db.getSiblingDB("noithatnhuy");
db.createCollection("categories");
db.categories.insertMany([
  { _id: 1, name: "Nội Thất Đồ Gỗ"},
  { _id: 2, name: "Nội Thất Nhựa Cao Cấp"},
  { _id: 3, name: "Đèn Trang Trí"},
  { _id: 4, name: "Quạt Trần Bốn Mùa" },
  { _id: 5, name: "Két sắt"},
  { _id: 6, name: "Tủ Thờ" },
  { _id: 7, name: "Bàn Ăn" },
  { _id: 8, name: "Bàn Trang Điểm" },
  { _id: 9, name: "Sofa" },
  { _id: 10, name: "Giường" }
]);
