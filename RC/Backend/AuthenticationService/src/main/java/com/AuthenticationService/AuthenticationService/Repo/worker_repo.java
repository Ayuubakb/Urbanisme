package com.AuthenticationService.AuthenticationService.Repo;

import com.AuthenticationService.AuthenticationService.Model.worker;
import org.springframework.data.jpa.repository.JpaRepository;

public interface worker_repo extends JpaRepository<worker, Float> {
  boolean existsBy(String email);

  boolean existsByN_immatriculation(String n_immatriculation);

  worker findByN_immatriculation(String nImmatriculation);

}
