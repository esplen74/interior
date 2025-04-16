package noithatnhuy.backend.controller;

import noithatnhuy.backend.entity.Category;
import noithatnhuy.backend.service.SequenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import noithatnhuy.backend.repository.CategoryRepository;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    @Autowired
    private CategoryRepository repository;
    @Autowired
    private SequenceGeneratorService sequenceGenerator;

    @GetMapping
    public List<Category> getAll() {
        return repository.findAll();
    }
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Category> createCategory(
            @RequestParam("name") String name,
            @RequestParam("image") MultipartFile imageFile) {

        int newCategoryId = (int) sequenceGenerator.generateSequence("category_sequence");

        String uploadDir = new File("public/images/category/" + newCategoryId).getAbsolutePath();
        String fileName = imageFile.getOriginalFilename();

        try {
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            Category category = new Category();
            category.setId(newCategoryId);
            category.setName(name);
            category.setImage("/images/category/" + newCategoryId + "/" + fileName);

            Category savedCategory = repository.save(category);
            return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Sửa danh mục theo ID (ID là _id do MongoDB tự tạo)
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Category> updateCategory(
            @PathVariable int id,
            @RequestParam("name") String name,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) {

        Optional<Category> optionalCategory = repository.findById(id);
        if (!optionalCategory.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        Category category = optionalCategory.get();
        category.setName(name);

        if (imageFile != null && !imageFile.isEmpty()) {
            String uploadDir = new File("public/images/category/" + id).getAbsolutePath();
            String fileName = imageFile.getOriginalFilename();

            try {
                Path uploadPath = Paths.get(uploadDir);
                if (!Files.exists(uploadPath)) {
                    Files.createDirectories(uploadPath);
                }
                Path filePath = uploadPath.resolve(fileName);
                Files.copy(imageFile.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

                category.setImage("/images/category/" + id + "/" + fileName);
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        }

        Category updatedCategory = repository.save(category);
        return ResponseEntity.ok(updatedCategory);
    }

    // Xóa danh mục theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable int id) {
        Optional<Category> optionalCategory = repository.findById(id);
        if (!optionalCategory.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        // Xóa folder chứa ảnh nếu có
        String folderPath = "public/images/category/" + id;
        try {
            Path directory = Paths.get(folderPath);
            if (Files.exists(directory)) {
                Files.walk(directory)
                        .sorted(Comparator.reverseOrder())
                        .map(Path::toFile)
                        .forEach(File::delete);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

}