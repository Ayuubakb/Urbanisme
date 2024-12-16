package com.WorkerService.WorkerService.Model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "workers")
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class worker {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  @Column(name = "id", nullable = false)
  private Long id;
  private String nom;
  private String prenom;
  private String matriculation;
  private String password;
  public String getMatriculation() {
    return matriculation;
  }

  public void setMatriculation(String matriculation) {
    this.matriculation = matriculation;
  }

  public String getPrenom() {
    return prenom;
  }

  public void setPrenom(String prenom) {
    this.prenom = prenom;
  }

  public String getNom() {
    return nom;
  }

  public void setNom(String nom) {
    this.nom = nom;
  }
}
