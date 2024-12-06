package com.AuthenticationService.AuthenticationService.Controllers;

import com.AuthenticationService.AuthenticationService.Repo.worker_repo;
import com.AuthenticationService.AuthenticationService.Service.autService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/worker")
@RequiredArgsConstructor
public class worker_authController {

  private final worker_repo workerRepo;
  private final autService authService;

  //login worker using n_immatriculation and password
  public ResponseEntity<String> loginWorker(String n_immatriculation, String password) {
    if (authService.loginWorker(n_immatriculation, password)) {
      return ResponseEntity.ok(Float.toString(authService.getWorkerId(n_immatriculation)));
    } else {
      return ResponseEntity.badRequest().body("Login failed");
    }
  }
}
