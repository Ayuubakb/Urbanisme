package com.UserEspace.DTOs;

import lombok.*;

@Data
@Builder
@RequiredArgsConstructor
@AllArgsConstructor
public class documentTranser {
  private byte[] cin_representant;
  private byte[] declaration_immatriculation;
  private byte[] attestaion_inscription_taxe;
  private byte[] prove_domicile;
  private byte[] certificat_negatif;
  private byte[] procuration;
  private byte[] procureur_cin;
}
