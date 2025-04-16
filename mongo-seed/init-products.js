db = db.getSiblingDB("noithatnhuy");
db.createCollection("products");
db.products.insertMany([
  {
    _id: ObjectId("67f2a87a81e23a1374831742"),
    productName: "ccccc",
    category_id: 7,
    hot: true,
    amount: 12000000,
    amount_sale: 10000000,
    description: "bàn ăn đẹp",
    image: "/images/category/0/background_4.jpg",
    _class: "noithatnhuy.backend.entity.Product"
  },
  
]);
