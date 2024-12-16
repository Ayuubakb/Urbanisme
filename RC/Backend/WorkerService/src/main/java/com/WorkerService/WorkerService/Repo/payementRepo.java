package com.WorkerService.WorkerService.Repo;

import com.WorkerService.WorkerService.Model.payement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface payementRepo extends JpaRepository<payement, Long> {

  @Transactional
  @Query(value = "SELECT * FROM payement WHERE id_demande = ?1", nativeQuery = true)
  payement findById_demande(Long id_demande);

}
