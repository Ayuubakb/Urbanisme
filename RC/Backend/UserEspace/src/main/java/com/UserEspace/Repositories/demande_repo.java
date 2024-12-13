package com.UserEspace.Repositories;

import com.UserEspace.Models.demande;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface demande_repo extends JpaRepository<demande, Long> {
  @Transactional
  @Query("SELECT d FROM demande d WHERE d.id_user = :userId")
  List<demande> findAllByUserId(@Param("userId") Long userId);

  @Modifying
  @Transactional
  @Query("DELETE FROM formulaire f WHERE f.id_demande = :id")
  void deleteFormulaireByDemandeId(@Param("id") Long id);

  @Modifying
  @Transactional
  @Query("DELETE FROM document d WHERE d.id_demande = :id")
  void deleteDocumentByDemandeId(@Param("id") Long id);

  @Modifying
  @Transactional
  @Query("DELETE FROM payement p WHERE p.id_demande = :id")
  void deletePayementByDemandeId(@Param("id") Long id);

  @Modifying
  @Transactional
  @Query("DELETE FROM demande d WHERE d.id = :id")
  void deleteDemandeById(@Param("id") Long id);
}
