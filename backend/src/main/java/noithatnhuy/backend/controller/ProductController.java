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
            @RequestParam("saleFlg") int saleFlg,
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

            // Đảm bảo file ảnh được lưu đúng tên
            String fileName = image.getOriginalFilename(); // Tên file ảnh
            String filePath = uploadDir + File.separator + fileName; // Đường dẫn file đầy đủ

            // Lưu file vào thư mục đã chỉ định
            image.transferTo(new File(filePath));
            System.out.println("File path: " + filePath);

            // Cập nhật thông tin sản phẩm
            Product product = new Product();
            product.setProductName(productName);
            product.setImage("/images/category/" + categoryId + "/" + fileName); // Đường dẫn ảnh trong ứng dụng
            product.setCategoryId(categoryId);
            product.setHot(hot);
            product.setAmount(amount);
            product.setSaleFlg(saleFlg);
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
            @RequestParam("saleFlg") int saleFlg,
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
        product.setSaleFlg(saleFlg);
        product.setAmountSale(amountSale);
        product.setDescription(description);

        // Nếu có upload ảnh mới thì xử lý lưu file
        if (imageFile != null && !imageFile.isEmpty()) {
            String uploadDir = "D:/Study/ReactJS/noithatnhuy/public/images/category/" + categoryId;
            String fileName = imageFile.getOriginalFilename();

            try {
                Path uploadPath = Paths.get(uploadDir);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }
                Path filePath = uploadPath.resolve(fileName);
                Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                // Lưu tên file vào DB
                product.setImage("/images/category/" + categoryId + "/" + fileName);
                System.out.println("File path update: " + filePath);
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
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
