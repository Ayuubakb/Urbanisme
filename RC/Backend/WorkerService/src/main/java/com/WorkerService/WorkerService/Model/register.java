package com.WorkerService.WorkerService.Model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "register")
@Getter
@Setter
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class register {
  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE)
  @Column(name = "id", nullable = false)
  private Long id;

  private String code;
  private Long id_demande;
  private byte[] file;


  //a register have one demand
  @OneToOne(cascade = CascadeType.ALL,orphanRemoval = true)
  @JoinColumn(name = "id_demande", referencedColumnName = "id", insertable = false, updatable = false)
  private demande demande;

}
