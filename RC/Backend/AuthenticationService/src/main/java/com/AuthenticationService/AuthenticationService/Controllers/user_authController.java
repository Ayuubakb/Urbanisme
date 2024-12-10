package com.AuthenticationService.AuthenticationService.Controllers;

import com.AuthenticationService.AuthenticationService.DTOs.loginUser;
import com.AuthenticationService.AuthenticationService.DTOs.passwordchangeDemande;
import com.AuthenticationService.AuthenticationService.DTOs.registerRequest;
import com.AuthenticationService.AuthenticationService.Repo.user_repo;
import com.AuthenticationService.AuthenticationService.Service.autService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/authenticate/user")
@RequiredArgsConstructor
public class user_authController {

  private final user_repo user_repo;
  private final autService authService;
  private final com.AuthenticationService.AuthenticationService.Service.passwordEncrypt passwordEncrypt;

  @PostMapping("/login")
  public ResponseEntity<String> login(@RequestBody loginUser user) {
    if (authService.loginUser(user.getEmail(), user.getPassword())) {
      float userId = authService.getUserId(user.getEmail());
      return ResponseEntity.ok(Float.toString(userId));
    } else {
      return ResponseEntity.badRequest().body("Login failed");
    }
  }

  @PostMapping("/register")
  public ResponseEntity<String> register(@RequestBody registerRequest user) {
    if (user.getNom().isEmpty() || user.getPrenom().isEmpty() || user.getEmail().isEmpty() || user.getPassword().isEmpty()) {
      return ResponseEntity.badRequest().body("All fields are required");
    } else if (authService.isEmailRegistered(user.getEmail())) {
      return ResponseEntity.badRequest().body("Email already registered");
    } else if (authService.registerUser(user)) {
      return ResponseEntity.ok("Registration successful");
    } else {
      return ResponseEntity.badRequest().body("Registration failed");
    }
  }



}
