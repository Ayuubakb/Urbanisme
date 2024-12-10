package com.UserEspace.Services;

import com.UserEspace.DTOs.DocumentDTO;
import com.UserEspace.Models.document;
import com.UserEspace.Repositories.document_repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class documentService {

  @Autowired
  private document_repo documentRepo;

  public String saveDocument(DocumentDTO documentDTO) {
    try {
      document doc = document.builder()
          .id_demande((long) documentDTO.getId_demande())
          .cin_representant(documentDTO.getCin_representant().getBytes())
          .declaration_immatriculation(documentDTO.getDeclaration_immatriculation().getBytes())
          .attestaion_inscription_taxe(documentDTO.getAttestaion_inscription_taxe().getBytes())
          .prove_domicile(documentDTO.getProve_domicile().getBytes())
          .certificat_negatif(documentDTO.getCertificat_negatif().getBytes())
          .procuration(documentDTO.getProcuration().getBytes())
          .procureur_cin(documentDTO.getProcureur_cin().getBytes())
          .build();
      document savedDoc = documentRepo.save(doc);
      //get the demande and set the id_document
      document existingDoc = documentRepo.findById_demande(savedDoc.getId_demande()).get();
      existingDoc.setId_demande(savedDoc.getId());
      documentRepo.save(existingDoc);
      return "Document saved successfully";
    } catch (IOException e) {
      return "Error saving document: " + e.getMessage();
    } catch (Exception e) {
      return "An unexpected error occurred: " + e.getMessage();
    }
  }
}
