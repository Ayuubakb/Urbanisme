package com.WorkerService.WorkerService.Repo;

import com.WorkerService.WorkerService.Model.register;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface register_repo extends JpaRepository<register, Long> {
  @Transactional
  @Query(value = "SELECT * FROM register WHERE id_demande = ?1", nativeQuery = true)
  register findByIdDemande(Long id_demande);
}
