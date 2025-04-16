package noithatnhuy.backend.controller;

import jakarta.servlet.ServletContext;
import noithatnhuy.backend.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import noithatnhuy.backend.repository.ProductRepository;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductRepository repository;
    @Autowired
    private ServletContext servletContext;
    private final String uploadDirectory = "public/images/category/";

    @GetMapping
    public List<Product> getAll() {
        return repository.findAll();
    }
    @PostMapping
    public ResponseEntity<?> createProduct(
            @RequestParam("productName") String productName,
            @RequestParam("image") MultipartFile image,
            @RequestParam("categoryId") int categoryId,
            @RequestParam("hot") boolean hot,
            @RequestParam("amount") int amount,
            @RequestParam("amountSale") int amountSale,
            @RequestParam("description") String description
    ) {
        try {
            // Lấy đường dẫn tuyệt đối của thư mục public/images/category/{categoryId}
            String uploadDir = new File("public/images/category/" + categoryId).getAbsolutePath();
            File dir = new File(uploadDir);

            if (!dir.exists()) {
                dir.mkdirs(); // Tạo thư mục nếu chưa tồn tại
            }

            String originalFilename = image.getOriginalFilename();
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String uniqueFileName = "product_" + UUID.randomUUID() + fileExtension; // Ví dụ: product_123.jpg
            String filePath = uploadDir + File.separator + uniqueFileName; // Đường dẫn file đầy đủ

            // Lưu file vào thư mục đã chỉ định
            image.transferTo(new File(filePath));

            // Cập nhật thông tin sản phẩm
            Product product = new Product();
            product.setProductName(productName);
            product.setImage("/images/category/" + categoryId + "/" + uniqueFileName); // Đường dẫn ảnh trong ứng dụng
            product.setCategoryId(categoryId);
            product.setHot(hot);
            product.setAmount(amount);
            product.setAmountSale(amountSale);
            product.setDescription(description);

            // Lưu sản phẩm vào database
            Product savedProduct = repository.save(product);

            return new ResponseEntity<>(savedProduct, HttpStatus.CREATED);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }




    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable String id,
            @RequestParam("productName") String productName,
            @RequestParam("categoryId") int categoryId,
            @RequestParam("hot") boolean hot,
            @RequestParam("amount") int amount,
            @RequestParam("amountSale") int amountSale,
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile imageFile // có thể null
    ) {
        Optional<Product> optionalProduct = repository.findById(id);
        if (!optionalProduct.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Product product = optionalProduct.get();

        product.setProductName(productName);
        product.setCategoryId(categoryId);
        product.setHot(hot);
        product.setAmount(amount);
        product.setAmountSale(amountSale);
        product.setDescription(description);

        if (imageFile != null && !imageFile.isEmpty()) {
            // Đường dẫn lưu ảnh
            String uploadDir = new File("public/images/category/" + categoryId).getAbsolutePath();

            // Tạo tên file duy nhất (dùng ID sản phẩm hoặc UUID)
            String originalFilename = imageFile.getOriginalFilename();
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String uniqueFileName = "product_" + UUID.randomUUID() + fileExtension;

            try {
                // Tạo thư mục nếu chưa có
                Path uploadPath = Paths.get(uploadDir);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }

                // Xóa ảnh cũ nếu có
                if (product.getImage() != null) {
                    Path oldImagePath = Paths.get("public" + product.getImage());
                    Files.deleteIfExists(oldImagePath);
                }

                // Ghi ảnh mới
                Path filePath = uploadPath.resolve(uniqueFileName);
                Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                // Lưu đường dẫn tương đối vào DB
                product.setImage("/images/category/" + categoryId + "/" + uniqueFileName);

            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }


        Product updatedProduct = repository.save(product);
        return ResponseEntity.ok(updatedProduct);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable String id) {
        Optional<Product> optionalProduct = repository.findById(id);

        if (optionalProduct.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Product product = optionalProduct.get();

        // Xóa ảnh nếu có
        if (product.getImage() != null && !product.getImage().isEmpty()) {
            try {
                Path imagePath = Paths.get("public" + product.getImage());
                if (Files.exists(imagePath)) {
                    Files.delete(imagePath);
                    System.out.println("Đã xóa ảnh: " + imagePath);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }

        // Xóa sản phẩm khỏi DB
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}
