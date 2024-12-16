package DocumentsGenerationService.DocumentGenerationService.Services;


import DocumentsGenerationService.DocumentGenerationService.Model.Demandes;
import DocumentsGenerationService.DocumentGenerationService.Repositories.DemandRepository;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.properties.TextAlignment;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class GenerationService {
    @Autowired
    DemandRepository demandRepository;
    @Autowired
    private JavaMailSender mailSender;


    public byte[] generatePdf(int id_demande) {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream();
             PdfWriter writer = new PdfWriter(baos);
             PdfDocument pdfDoc = new PdfDocument(writer);
             Document document = new Document(pdfDoc)) {

            // Set up fonts
            PdfFont timesRoman = PdfFontFactory.createFont();

            // Add header
            document.add(new Paragraph("Certificat de residence")
                    .setFont(timesRoman)
                    .setFontSize(12)
                    .setTextAlignment(TextAlignment.LEFT));

            // Add title
            document.add(new Paragraph("C")
                    .setFont(timesRoman)
                    .setFontSize(10)
                    .setTextAlignment(TextAlignment.LEFT));

            // Prepare form data
            List<String> formData = prepareFormData(id_demande);

            // Add form data
            for (String dataLine : formData) {
                document.add(new Paragraph(dataLine)
                        .setFont(timesRoman)
                        .setFontSize(10));
            }

            // Add footer
            document.add(new Paragraph("Délivré pour servir et valoir ce que de droit.")
                    .setFont(timesRoman)
                    .setFontSize(8)
                    .setTextAlignment(TextAlignment.LEFT));

            // Close document
            document.close();

            return baos.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Error generating PDF", e);
        }
    }

    private List<String> prepareFormData(int id_demande) {
        List<String> data = new ArrayList<>();
        Optional<Demandes> formData=demandRepository.findById(id_demande);

        // Populate data lines
        data.add("La Société: " + formData.get().getNom_emetteur());
        data.add("Forme Juridique: " + formData.get().getPrenom_emetteur());
        data.add("Capital Social: " + formData.get().getAddress());
        data.add("Adresse: " + formData.get().getCin());
        /*data.add("Est inscrit au dit registre depuis le: " + formData.get().getNom_emetteur());
        data.add("Numéro Chronologique: " + formData.get().getNom_emetteur());
        data.add("Numéro I.C.E: " + formData.getIce());
        data.add("Numéro Analytique: " + registerData.getCode());*/

        return data;
    }
    public void sendEmailWithPdf(int id_demande, String recipientEmail) {
        byte[] pdfContent = generatePdf(id_demande);
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setFrom("bricolini.ensate@gmail.com");
            helper.setTo(recipientEmail);
            helper.setSubject("Certificat de Résidence");
            helper.setText("Veuillez trouver en pièce jointe votre certificat de résidence.");
            helper.addAttachment("certificat_residence.pdf",
                    new ByteArrayResource(pdfContent));

            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Error sending email", e);
        }
    }
}