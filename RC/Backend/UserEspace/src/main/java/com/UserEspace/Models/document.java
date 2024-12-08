package com.UserEspace.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "document")
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class document {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  @Column(name = "id", nullable = false)
  private Long id;

  private Long id_demande;


  @Lob
  private byte[] cin_representant;

  @Lob
  private byte[] declaration_immatriculation;

  @Lob
  private byte[] attestaion_inscription_taxe;

  @Lob
  private byte[] prove_domicile;

  @Lob
  private byte[] certificat_negatif;

  @Lob
  private byte[] procuration;

  @Lob
  private byte[] procureur_cin;

  @OneToOne
  @JoinColumn(name = "id_demande", referencedColumnName = "id", insertable = false, updatable = false)
  @JsonBackReference
  @JsonIgnore
  private demande demande;

}
