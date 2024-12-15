package com.UserService.UserService.DTOs;

import com.UserService.UserService.Enums.Type_Employe;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UserDTO {
    private int id_employe;
    private String num_immatriculation;
    private String nom;
    private String prenom;
    private String cin;
    private String telephone;
    private String zone;
    private Type_Employe type_employe;
}
