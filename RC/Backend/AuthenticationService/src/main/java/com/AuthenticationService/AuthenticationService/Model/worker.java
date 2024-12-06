package com.AuthenticationService.AuthenticationService.Model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "worker")
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class worker {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  @Column(name = "id", nullable = false)
  private float id;
  private String nom;
  private String prenom;
  private String N_immatriculation;
  private String password;
}
