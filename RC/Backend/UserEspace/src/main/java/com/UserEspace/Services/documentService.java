package com.UserEspace.Services;

import com.UserEspace.DTOs.DocumentDTO;
import com.UserEspace.Models.demande;
import com.UserEspace.Models.document;
import com.UserEspace.Repositories.document_repo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@Slf4j
public class documentService {

  @Autowired
  private document_repo documentRepo;
  @Autowired
  private document_repo document_repo;


  public document saveDocumentWithProcureur(Long id_demande, MultipartFile cin_representant, MultipartFile declaration_immatriculation, MultipartFile attestaion_inscription_taxe, MultipartFile prove_domicile, MultipartFile certificat_negatif, MultipartFile procuration, MultipartFile procureur_cin) throws IOException {
    return document_repo.save(
      document.builder()
        .id_demande(id_demande)
        .cin_representant(cin_representant.getBytes())
        .declaration_immatriculation(declaration_immatriculation.getBytes())
        .attestaion_inscription_taxe(attestaion_inscription_taxe.getBytes())
        .prove_domicile(prove_domicile.getBytes())
        .certificat_negatif(certificat_negatif.getBytes())
        .procuration(procuration.getBytes())
        .procureur_cin(procureur_cin.getBytes())
        .build()
    );
  }

  public document saveDocumentWithoutProcureur(Long id_demande, MultipartFile cin_representant, MultipartFile declaration_immatriculation, MultipartFile attestaion_inscription_taxe, MultipartFile prove_domicile, MultipartFile certificat_negatif) throws IOException {
    return document_repo.save(
      document.builder()
        .id_demande(id_demande)
        .cin_representant(cin_representant.getBytes())
        .declaration_immatriculation(declaration_immatriculation.getBytes())
        .attestaion_inscription_taxe(attestaion_inscription_taxe.getBytes())
        .prove_domicile(prove_domicile.getBytes())
        .certificat_negatif(certificat_negatif.getBytes())
        .procuration(null)
        .procureur_cin(null)
        .build()
    );
  }
}
