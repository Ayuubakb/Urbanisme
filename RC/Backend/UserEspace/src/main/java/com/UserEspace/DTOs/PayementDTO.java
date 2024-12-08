package com.UserEspace.DTOs;


import lombok.Data;

import java.sql.Date;

@Data
public class PayementDTO {
  private float id;
  private float id_demande;
  private String status;
  private Date date_payement;
}
