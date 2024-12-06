package com.ClientSpace.DTOs;


import com.ClientSpace.Models.demande;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DemandeDTO {
  private float id;
  private float id_user;
  private String status;
  private String motif;
  private boolean is_procureur;

  public DemandeDTO(demande demande){
    this.id = demande.getId();
    this.id_user = demande.getId_user();
    this.status = demande.getStatus();
    this.motif = demande.getMotif();
    this.is_procureur = demande.is_procureur();
  }
}
