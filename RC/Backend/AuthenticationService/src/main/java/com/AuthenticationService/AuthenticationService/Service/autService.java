package com.AuthenticationService.AuthenticationService.Service;

import com.AuthenticationService.AuthenticationService.DTOs.registerRequest;
import com.AuthenticationService.AuthenticationService.Model.user;
import com.AuthenticationService.AuthenticationService.Model.worker;
import com.AuthenticationService.AuthenticationService.Repo.user_repo;
import com.AuthenticationService.AuthenticationService.Repo.worker_repo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class autService {

  @Autowired
  private final user_repo userRepo;

  private final worker_repo workerRepo;

  public autService(user_repo userRepo, worker_repo workerRepo) {
    this.userRepo = userRepo;
    this.workerRepo = workerRepo;
  }

  //register user
  public boolean registerUser(registerRequest request) {
    //check if any field is empty or null
    if (request.getNom().isEmpty() || request.getPrenom().isEmpty() || request.getEmail().isEmpty() || request.getPassword().isEmpty()) {
      return false;
    }
    //check if email already exists
    if (userRepo.existsByEmail(request.getEmail())) {
      return false;
    }
    //create the user and save it
    user newUser = user.builder().nom(request.getNom()).prenom(request.getPrenom()).email(request.getEmail()).password(passwordEncrypt.encrypt(request.getPassword())).build();
    userRepo.save(newUser);
    return true;
  }

  public boolean loginUser(String email, String password) {
    //check if email exists
    if (!userRepo.existsByEmail(email)) {
      return false;
    }
    //get the user
    user user = userRepo.findByEmail(email);
    //check if the password is correct
    return passwordEncrypt.checkPassword(password, user.getPassword());
  }

  public boolean isEmailRegistered(String email) {
    return userRepo.existsByEmail(email);
  }

  public float getUserId(String email) {
    return userRepo.findByEmail(email).getId();
  }

  public boolean loginWorker(String n_immatriculation, String password) {
    //check if n_immatriculation exists
    if (!workerRepo.existsByMatriculation(n_immatriculation)) {
      return false;
    }
    //get the worker
    worker worker = workerRepo.findByMatriculation(n_immatriculation);
    //check if the password is correct
    return passwordEncrypt.checkPassword(password, worker.getPassword());
  }

  public float getWorkerId(String n_immatriculation) {
    return workerRepo.findByMatriculation(n_immatriculation).getId();
  }

  public boolean changePassword(String password, float id) {
    //check if the user exists
    if (!userRepo.existsById(id)) {
      return false;
    }
    //the user exist so we get it
    user user = userRepo.findById(id).get();
    //change the password
    user.setPassword(passwordEncrypt.encrypt(password));
    //save the user
    userRepo.save(user);
    return true;
  }
}
