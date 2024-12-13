package com.AuthenticationService.AuthenticationService.DTOs;

import lombok.Data;

@Data
public class passwordchangeDemande {
  private String oldPassword;
  private String newPassword;
}
