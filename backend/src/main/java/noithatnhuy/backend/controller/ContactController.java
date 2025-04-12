package noithatnhuy.backend.controller;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import noithatnhuy.backend.entity.ContactRequest;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ContactController {

    private final JavaMailSender mailSender;

    @PostMapping
    public String sendContact(@RequestBody ContactRequest request) throws MessagingException {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo("phanviethuy670@gmail.com");
        message.setSubject("Liên hệ từ website");
        message.setText(
                "Tên: " + request.getName() +
                        "\nEmail: " + request.getEmail() +
                        "\nNội dung: " + request.getMessage()
        );
        mailSender.send(message);
        return "Success";
    }
}
