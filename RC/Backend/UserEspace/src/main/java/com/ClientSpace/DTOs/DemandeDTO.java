package com.ClientSpace.DTOs;


import lombok.Data;

@Data
public class DemandeDTO {
  private float id;
  private float id_user;
  private String status;
  private String motif;
  private boolean is_procureur;
}
