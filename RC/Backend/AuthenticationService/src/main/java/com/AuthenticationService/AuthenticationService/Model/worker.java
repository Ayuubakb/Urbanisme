package com.AuthenticationService.AuthenticationService.Model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "workers")
@Getter
@Setter
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
}
