package com.WorkerService.WorkerService.Repo;

import com.WorkerService.WorkerService.Model.formulaire;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface formulaire_repo extends JpaRepository<formulaire, Long> {
  @Transactional
  @Query(value = "SELECT * FROM formulaire WHERE id_demande = :id_demande", nativeQuery = true)
  Optional<formulaire> findById_demande(@Param("id_demande") float id_demande);
  @Transactional
  @Query(value = "SELECT * FROM formulaire WHERE id = :id", nativeQuery = true)
  Optional<formulaire> findById(@Param("id") float id);
}
