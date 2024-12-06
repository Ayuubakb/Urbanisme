package com.AuthenticationService.AuthenticationService.DTOs;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class workerloginrequest {
  private String immatriculation;
  private String password;
}
