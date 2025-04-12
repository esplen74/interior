package noithatnhuy.backend.controller;

import noithatnhuy.backend.entity.Category;
import noithatnhuy.backend.service.SequenceGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import noithatnhuy.backend.repository.CategoryRepository;

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
    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category) {
        // Nếu bạn muốn tự động tạo categoryId dựa trên dữ liệu, có thể xử lý logic ở đây
        int newCategoryId = (int) sequenceGenerator.generateSequence("category_sequence");
        category.setId(newCategoryId);
        Category savedCategory = repository.save(category);
        return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);
    }

    // Sửa danh mục theo ID (ID là _id do MongoDB tự tạo)
    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable int id, @RequestBody Category categoryDetails) {
        Optional<Category> optionalCategory = repository.findById(id);
        if (!optionalCategory.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Category category = optionalCategory.get();
        category.setName(categoryDetails.getName());
        // Nếu cần cập nhật categoryId, bạn cũng có thể làm:
        // category.setCategoryId(categoryDetails.getCategoryId());
        Category updatedCategory = repository.save(category);
        return ResponseEntity.ok(updatedCategory);
    }

    // Xóa danh mục theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable int id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}