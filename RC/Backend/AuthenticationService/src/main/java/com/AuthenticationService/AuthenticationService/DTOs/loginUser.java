package com.AuthenticationService.AuthenticationService.DTOs;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class loginUser {
  private String email;
  private String password;
}
