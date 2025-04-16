db = db.getSiblingDB("noithatnhuy");
db.createCollection("database_sequences");
db.database_sequences.insertMany([
  { _id: "category_sequence", seq: 10 }
]);
