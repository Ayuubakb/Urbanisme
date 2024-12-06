package com.ClientSpace.DTOs;


import lombok.Data;

import java.sql.Date;

@Data
public class FormulaireDTO {
  private float id;
  private float id_demande;
  private String nom;
  private String prenom;
  private String cin;
  private Boolean procuration;
  private String adresse;
  private String nr_chronologique;
  private String ice;
  private String benificiaire_nom;
  private String benificiaire_prenom;
  private String benificiaire_cin;
  private String objet_commerce;
  private Date date_creation;
  private float capital;
}
