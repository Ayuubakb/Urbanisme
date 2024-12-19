package com.UserEspace.Services;

import com.UserEspace.Repositories.demande_repo;
import com.UserEspace.Repositories.formulaire_repo;
import com.UserEspace.Repositories.payementRepo;
import com.UserEspace.Repositories.register_repo;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.properties.TextAlignment;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class RegisterService {
  private final register_repo registerRepo;
  private final formulaire_repo formulaireRepo;
  private final payementRepo paymentRepo;

  public RegisterService(register_repo registerRepo, demande_repo demandeRepo,
                         formulaire_repo formulaireRepo, payementRepo paymentRepo) {
    this.registerRepo = registerRepo;
    this.formulaireRepo = formulaireRepo;
    this.paymentRepo = paymentRepo;
  }

  public byte[] generatePdf(Long id_demande) {
    try (ByteArrayOutputStream baos = new ByteArrayOutputStream();
         PdfWriter writer = new PdfWriter(baos);
         PdfDocument pdfDoc = new PdfDocument(writer);
         Document document = new Document(pdfDoc)) {

      // Set up fonts
      PdfFont timesRoman = PdfFontFactory.createFont();

      // Add header
      document.add(new Paragraph("Registre du Commerce")
        .setFont(timesRoman)
        .setFontSize(12)
        .setTextAlignment(TextAlignment.LEFT));

      // Add title
      document.add(new Paragraph("Certificat d'immatriculation")
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

  private List<String> prepareFormData(Long id_demande) {
    List<String> data = new ArrayList<>();

    // Fetch data from repositories
    var formData = formulaireRepo.findById_demande(id_demande).get();
    var paymentData = paymentRepo.findById_demande(id_demande);
    var registerData = registerRepo.findByIdDemande(id_demande);

    // Populate data lines
    data.add("La Société: " + formData.getNom());
    data.add("Forme Juridique: " + formData.getPrenom());
    data.add("Capital Social: " + formData.getCapital());
    data.add("Adresse: " + formData.getAdresse());
    data.add("Objet du Commerce: " + formData.getObjet_commerce());
    data.add("Est inscrit au dit registre depuis le: " + paymentData.getDate_payement());
    data.add("Numéro Chronologique: " + formData.getNr_chronologique());
    data.add("Numéro I.C.E: " + formData.getIce());
    data.add("Numéro Analytique: " + registerData.getCode());

    return data;
  }
}
