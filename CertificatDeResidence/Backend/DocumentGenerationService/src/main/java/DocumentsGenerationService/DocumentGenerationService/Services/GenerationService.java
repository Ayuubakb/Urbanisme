package DocumentsGenerationService.DocumentGenerationService.Services;


import DocumentsGenerationService.DocumentGenerationService.Model.Demandes;
import DocumentsGenerationService.DocumentGenerationService.Repositories.DemandRepository;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.properties.HorizontalAlignment;
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
import java.util.HashMap;
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
            String logoPath = getClass().getClassLoader().getResource("static/logo.jpeg").getPath();
            Image logo = new Image(ImageDataFactory.create(logoPath))
                    .scaleToFit(130, 130)
                    .setHorizontalAlignment(HorizontalAlignment.CENTER)
                    .setMarginBottom(20);
            document.add(logo);
            // Add header
            document.add(new Paragraph("CERTIFICAT DE RÉSIDENCE")
                    .setFont(timesRoman)
                    .setFontSize(18)
                    .setBold()
                    .setTextAlignment(TextAlignment.CENTER)
                    .setMarginBottom(30));
            // Prepare form data
            HashMap<String,String> formData = prepareFormData(id_demande);

            // Add form data
            String content = "Je soussigné, certifie que :\n\n" +
                    "Nom : " + formData.get("Nom") + "\n" +
                    "Prénom : " + formData.get("Prénom") + "\n" +
                    "CIN : " + formData.get("CIN") + "\n" +
                    "Adresse : " + formData.get("Adresse") + "\n\n" +
                    "Réside actuellement dans la région concernée.\n" +
                    "Ce certificat est délivré pour servir et valoir ce que de droit.";

            document.add(new Paragraph(content)
                    .setFont(timesRoman)
                    .setFontSize(12)
                    .setTextAlignment(TextAlignment.LEFT));

            String tmpPath = getClass().getClassLoader().getResource("static/tamp.jpg").getPath();
            Image tmp = new Image(ImageDataFactory.create(tmpPath))
                    .scaleToFit(60, 60) //
                    .setHorizontalAlignment(HorizontalAlignment.RIGHT)
                    .setMarginTop(30);
            document.add(tmp);

            // Close document
            document.close();

            return baos.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Error generating PDF", e);
        }
    }

    private HashMap<String,String> prepareFormData(int id_demande) {
        HashMap<String,String> data = new HashMap<String,String>();
        Optional<Demandes> formData=demandRepository.findById(id_demande);

        // Populate data lines
        data.put("Nom" , formData.get().getNom_emetteur());
        data.put("Prénom" , formData.get().getPrenom_emetteur());
        data.put("Adresse" , formData.get().getAddress());
        data.put("CIN" , formData.get().getCin());

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