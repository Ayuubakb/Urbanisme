package com.AuthenticationService.AuthenticationService.Controllers;

import com.AuthenticationService.AuthenticationService.DTOs.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/authenticate")
public class AuthenticationController {

    @Autowired
    RestTemplate restTemplate;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(User signupInfos){
        try {
            restTemplate.postForEntity("http://UserService/user/add", signupInfos, User.class);
        }catch(Exception e){
            System.out.println(e.getMessage());
            return new ResponseEntity<>("Something Went Wrong", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity<>("Added Successfully", HttpStatus.CREATED);
    }

}
