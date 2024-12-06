package com.ClientSpace.DTOs;


import lombok.Data;

@Data
public class DocumentDTO {
  private float id;
  private float id_demande;
  private byte[] cin_representant;
  private byte[] declaration_immatriculation;
  private byte[] attestaion_inscription_taxe;
  private byte[] prove_domicile;
  private byte[] certificat_negatif;
  private byte[] procuration;
  private byte[] procureur_cin;
}
