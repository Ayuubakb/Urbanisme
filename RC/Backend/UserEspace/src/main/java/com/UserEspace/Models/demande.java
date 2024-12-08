package com.UserEspace.Models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "demande")
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class demande {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  @Column(name = "id", nullable = false)
  private Long id;

  private Long id_user;
  private Long id_formulaire;
  private Long id_payement;
  private Long id_document;
  private String status;
  private String motif;
  private boolean is_procureur;

  //a user can have many demands
  @ManyToOne
  @JoinColumn(name = "id_user", referencedColumnName = "id", insertable = false, updatable = false)
  @JsonBackReference
  @JsonIgnore
  private user user;

  @ManyToOne
  @JoinColumn(name = "id_formulaire", referencedColumnName = "id", insertable = false, updatable = false)
  @JsonBackReference
  @JsonIgnore
  private formulaire formulaire;


  //the demand have one payement
  @OneToOne
  @JoinColumn(name = "id_payement", referencedColumnName = "id", insertable = false, updatable = false)
  @JsonBackReference
  @JsonIgnore
  private payement payement;


  //the demand have one document
  @OneToOne
  @JoinColumn(name = "id_document", referencedColumnName = "id", insertable = false, updatable = false)
  @JsonBackReference
  @JsonIgnore
  private document document;


}