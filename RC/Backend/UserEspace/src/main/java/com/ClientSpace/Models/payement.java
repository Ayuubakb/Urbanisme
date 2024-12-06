package com.ClientSpace.Models;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@Table(name = "payement")
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class payement {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  @Column(name = "id", nullable = false)
  private float id;

  private float id_demande;

  private String status;

  private Date date_payement;


  @OneToOne
  @JoinColumn(name = "id_demande", referencedColumnName = "id", insertable = false, updatable = false)
  @JsonBackReference
  @JsonIgnore
  private demande demande;
}
