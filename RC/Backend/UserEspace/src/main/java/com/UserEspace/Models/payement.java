package com.UserEspace.Models;


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
  private Long id;

  private Long id_demande;

  private String status;

  private Date date_payement;


  @OneToOne(cascade = CascadeType.ALL,orphanRemoval = true)
  @JoinColumn(name = "id_demande", referencedColumnName = "id", insertable = false, updatable = false)
  @JsonBackReference
  @JsonIgnore
  private demande demande;
}
