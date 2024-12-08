package com.AuthenticationService.AuthenticationService.Repo;

import com.AuthenticationService.AuthenticationService.Model.worker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface worker_repo extends JpaRepository<worker, Float> {
  boolean existsByMatriculation(String n_immatriculation);

  worker findByMatriculation(String nImmatriculation);

}
