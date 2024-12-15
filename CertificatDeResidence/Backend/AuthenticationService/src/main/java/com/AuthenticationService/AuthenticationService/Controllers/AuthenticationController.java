package com.AuthenticationService.AuthenticationService.Controllers;

import  com.AuthenticationService.AuthenticationService.DTOs.LoginDTO;
import com.AuthenticationService.AuthenticationService.Models.User;
import com.AuthenticationService.AuthenticationService.Services.LoginServices;
import jakarta.servlet.http.HttpSession;
import jakarta.websocket.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/authenticate")
public class AuthenticationController {
    @Autowired
    LoginServices loginServices;

    @PostMapping("/login")
    public ResponseEntity<User> login(HttpSession session,@RequestBody LoginDTO loginInfos){
        User user=loginServices.login(loginInfos.getNum_immatriculation(),loginInfos.getPassword());
        if(user!=null) {
            session.setAttribute("userId", user.getId_employe());
            session.setAttribute("type_employe", user.getType_employe());
            session.setAttribute("num_immatriculation", user.getNum_immatriculation());
            session.setAttribute("id_zone",user.getId_zone());
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>(null,HttpStatus.UNAUTHORIZED);
    }

    @DeleteMapping("/logout")
    public ResponseEntity<Boolean> logout(HttpSession session){
        session.removeAttribute("userId");
        session.removeAttribute("type_employe");
        session.removeAttribute("num_immatriculation");
        session.invalidate();
        return new ResponseEntity<>(true,HttpStatus.OK);
    }

    @PostMapping("/hashPassword")
    public String hashPassword(@RequestBody String password){
        return loginServices.encoder().encode(password);
    }

}
