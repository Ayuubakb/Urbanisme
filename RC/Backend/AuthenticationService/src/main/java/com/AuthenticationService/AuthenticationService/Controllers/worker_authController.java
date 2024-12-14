package com.AuthenticationService.AuthenticationService.Controllers;

import com.AuthenticationService.AuthenticationService.DTOs.addWorker;
import com.AuthenticationService.AuthenticationService.DTOs.workerloginrequest;
import com.AuthenticationService.AuthenticationService.Repo.worker_repo;
import com.AuthenticationService.AuthenticationService.Service.autService;
import com.AuthenticationService.AuthenticationService.Service.passwordEncrypt;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.AuthenticationService.AuthenticationService.Model.worker;

@RestController
@RequestMapping("/authenticate/worker")
@RequiredArgsConstructor
@Controller
public class worker_authController {

  private final worker_repo workerRepo;
  private final autService authService;
  private final passwordEncrypt passwordEncrypt;

  //login worker using n_immatriculation and password
  @PostMapping("/login")
  public ResponseEntity<String> loginWorker(@RequestBody workerloginrequest loginRequest) {
    if (authService.loginWorker(loginRequest.getImmatriculation(), loginRequest.getPassword())) {
      return ResponseEntity.ok(Float.toString(authService.getWorkerId(loginRequest.getImmatriculation())));
    } else {
      return ResponseEntity.badRequest().body("Login failed");
    }
  }
  //add worker to the database
  @PostMapping("/add")
    public ResponseEntity<String> addWorker(
      @RequestBody addWorker worker) {
    //check if all the fields are filled
    if (worker.getNom() == null || worker.getPrenom() == null || worker.getMatricule() == null || worker.getPassword() == null) {
      return ResponseEntity.badRequest().body("Please fill all the fields");
    }else {
      //create a worker and save it to the database
      worker newWorker = new worker().builder()
        .nom(worker.getNom())
        .prenom(worker.getPrenom())
        .matriculation(worker.getMatricule())
        .password(com.AuthenticationService.AuthenticationService.Service.passwordEncrypt.encrypt(worker.getPassword()))
        .build();
      //save the worker to the database
      workerRepo.save(newWorker);
      return ResponseEntity.ok("Worker added successfully");
    }


  }

}
