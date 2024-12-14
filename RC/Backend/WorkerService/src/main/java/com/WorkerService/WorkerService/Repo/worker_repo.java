package com.WorkerService.WorkerService.Repo;

import com.WorkerService.WorkerService.Model.worker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface worker_repo extends JpaRepository<worker,Long> {


  @Query(value = "SELECT id FROM demande WHERE status = 'En cours'", nativeQuery = true)
  List<Long> demandeByStatus();
}
