package com.UserEspace.DTOs;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class userDto {
  private String nom;
  private String prenom;
}
