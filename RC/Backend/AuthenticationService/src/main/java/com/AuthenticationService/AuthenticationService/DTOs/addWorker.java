package com.AuthenticationService.AuthenticationService.DTOs;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class addWorker {
  private String nom;
  private String prenom;
  private String matricule;
  private String password;
}
