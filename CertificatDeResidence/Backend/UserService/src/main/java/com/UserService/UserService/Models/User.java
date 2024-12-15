package com.UserService.UserService.Models;

import com.UserService.UserService.Enums.Type_Employe;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "employes")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id_employe;
    private String num_immatriculation;
    private String password;
    private String nom;
    private String prenom;
    private String cin;
    private String telephone;
    @ManyToOne
    @JoinColumn(name = "id_zone")
    private Zone zone;
    @Enumerated(EnumType.STRING)
    private Type_Employe type_employe;
}
