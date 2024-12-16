package DocumentsGenerationService.DocumentGenerationService.Controller;


import DocumentsGenerationService.DocumentGenerationService.Services.GenerationService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/generate")
public class GenerationController {
    @Autowired
    GenerationService generationService;

    @PutMapping("/sendMail/{id}/{email}")
    public void generate(@PathVariable int id, @PathVariable String email) {
        generationService.sendEmailWithPdf(id,email);
    }
}
