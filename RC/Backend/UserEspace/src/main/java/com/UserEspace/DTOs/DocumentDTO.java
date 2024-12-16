package com.UserEspace.DTOs;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
public class DocumentDTO {
  private float id_demande;
  private MultipartFile cin_representant;
  private MultipartFile declaration_immatriculation;
  private MultipartFile attestaion_inscription_taxe;
  private MultipartFile prove_domicile;
  private MultipartFile certificat_negatif;
  private MultipartFile procuration;
  private MultipartFile procureur_cin;
}
