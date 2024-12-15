package com.AuthenticationService.AuthenticationService.Models;

import com.AuthenticationService.AuthenticationService.Enums.Type_Employe;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "employes")
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
    private int id_zone;
    @Enumerated(EnumType.STRING)
    private Type_Employe type_employe;
}
