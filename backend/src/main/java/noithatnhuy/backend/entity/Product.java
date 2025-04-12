package noithatnhuy.backend.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document(collection = "products")
public class Product {
    @Id
    private String id;
    @Field("productName")
    private String productName;
    @Field("category_id")
    private int categoryId;
    @Field("hot")
    private boolean hot;
    @Field("amount")
    private double amount;
    @Field("sale_flg")
    private int saleFlg;
    @Field("amount_sale")
    private double amountSale;
    @Field("description")
    private String description;
    @Field("image")
    private String image;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public boolean getHot() {
        return hot;
    }

    public void setHot(boolean hot) {
        this.hot = hot;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public int getSaleFlg() {
        return saleFlg;
    }

    public void setSaleFlg(int saleFlg) {
        this.saleFlg = saleFlg;
    }

    public double getAmountSale() {
        return amountSale;
    }

    public void setAmountSale(double amountSale) {
        this.amountSale = amountSale;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}