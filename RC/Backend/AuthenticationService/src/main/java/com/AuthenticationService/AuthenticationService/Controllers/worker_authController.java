package com.AuthenticationService.AuthenticationService.Controllers;

import com.AuthenticationService.AuthenticationService.DTOs.workerloginrequest;
import com.AuthenticationService.AuthenticationService.Repo.worker_repo;
import com.AuthenticationService.AuthenticationService.Service.autService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/authenticate/worker")
@RequiredArgsConstructor
@Controller
public class worker_authController {

  private final worker_repo workerRepo;
  private final autService authService;

  //login worker using n_immatriculation and password
  @PostMapping("/login")
  public ResponseEntity<String> loginWorker(@RequestBody workerloginrequest loginRequest) {
    if (authService.loginWorker(loginRequest.getImmatriculation(), loginRequest.getPassword())) {
      return ResponseEntity.ok(Float.toString(authService.getWorkerId(loginRequest.getImmatriculation())));
    } else {
      return ResponseEntity.badRequest().body("Login failed");
    }
  }

}
