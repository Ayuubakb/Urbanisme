package com.AuthenticationService.AuthenticationService.DTOs;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class registerRequest {

  private String nom;
  private String prenom;
  private String email;
  private String password;
}
