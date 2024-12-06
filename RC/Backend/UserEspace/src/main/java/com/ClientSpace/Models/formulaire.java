package com.ClientSpace.Models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@Table(name = "formulaire")
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class formulaire {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  @Column(name = "id", nullable = false)
  private float id;
  private float id_demande;
  private String nom;
  private String prenom;
  private String cin;
  private Boolean procuration;
  private String adresse;  // Contrat de bail légalisé ou attestation de domiciliation
  private String nr_chronologique; // Decl D'immatriculation
  private String ice;  //Certificat Négatif
  private String benificiaire_nom;
  private String benificiaire_prenom;
  private String benificiaire_cin;
  private String objet_commerce;
  private Date date_creation;
  private float capital; // Declaration d'immatriculation


  @OneToOne
  @JoinColumn(name = "id_demande", referencedColumnName = "id", insertable = false, updatable = false)
  @JsonIgnore
  @JsonBackReference
  private demande demande;


}
