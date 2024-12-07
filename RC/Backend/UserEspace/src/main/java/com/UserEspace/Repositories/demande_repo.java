package com.UserEspace.Repositories;

import com.UserEspace.Models.demande;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface demande_repo extends JpaRepository<demande, Long> {
  @Query("SELECT d FROM demande d WHERE d.id_user = :userId")
  List<demande> findAllByUserId(@Param("userId") Long userId);
}
