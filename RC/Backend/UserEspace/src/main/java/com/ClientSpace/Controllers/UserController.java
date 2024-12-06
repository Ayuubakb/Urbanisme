package com.ClientSpace.Controllers;

import com.ClientSpace.DTOs.userDto;
import com.ClientSpace.Models.user;
import com.ClientSpace.Repositories.user_repo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final user_repo user_repo;

    @GetMapping("/profile")
    public ResponseEntity<userDto> getProfile(@RequestBody Float id) {
        user user = user_repo.findById(id).isPresent() ? user_repo.findById(id).get() : null;
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userDto.builder().nom(user.getNom()).prenom(user.getPrenom()).build());
    }
    //change password



}
