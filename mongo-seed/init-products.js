db = db.getSiblingDB("noithatnhuy");
db.createCollection("products");
db.products.insertMany([
  {
    _id: ObjectId("67f2a87a81e23a1374831742"),
    productName: "ccccc",
    category_id: 7,
    hot: true,
    amount: 12000000,
    sale_flg: 1,
    amount_sale: 10000000,
    description: "bàn ăn đẹp",
    image: "/images/category/0/background_4.jpg",
    _class: "noithatnhuy.backend.entity.Product"
  },
  {
    _id: ObjectId("67f2afe281e23a1374831745"),
    productName: "aaaaaa",
    category_id: 5,
    hot: true,
    amount: 0,
    sale_flg: 1,
    amount_sale: 0,
    description: "aaaa",
    image: "/images/category/5/banan2.jpg",
    _class: "noithatnhuy.backend.entity.Product"
  },
  {
    _id: ObjectId("67f7bec5ca0dbd34d7fb4666"),
    productName: "aaaaaa",
    category_id: 7,
    hot: true,
    amount: 0,
    sale_flg: 0,
    amount_sale: 0,
    description: "aaaa",
    image: "/images/category/7/ban_4tr5.jpg",
    _class: "noithatnhuy.backend.entity.Product"
  }
]);
