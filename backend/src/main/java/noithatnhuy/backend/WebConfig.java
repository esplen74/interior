package noithatnhuy.backend;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")  // Cho phép tất cả các API với path bắt đầu bằng /api
                .allowedOrigins("*")  //
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Các phương thức được phép
                .allowedHeaders("*");  // Cho phép tất cả các header
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Map các URL bắt đầu bằng /images/ tới thư mục trên máy chủ
        registry.addResourceHandler("/images/**")
                .addResourceLocations("file:/app/public/images/");
    }
}