package com.UserService.UserService.Utils;

import com.UserService.UserService.DTOs.UserDTO;
import com.UserService.UserService.Models.User;
import org.springframework.stereotype.Service;

@Service
public class GenerateDTOs {
    public UserDTO generateUserDto(User user) {
        return new UserDTO(
                user.getId_employe(),
                user.getNum_immatriculation(),
                user.getNom(),
                user.getPrenom(),
                user.getCin(),
                user.getTelephone(),
                user.getZone().getNom_zone(),
                user.getType_employe()
        );
    }
}
