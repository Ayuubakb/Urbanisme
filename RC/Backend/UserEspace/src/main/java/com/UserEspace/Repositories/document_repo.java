package com.UserEspace.Repositories;

import com.UserEspace.Models.document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface document_repo extends JpaRepository<document, Long> {

    @Query(value = "SELECT * FROM document WHERE id_demande = :id_demande", nativeQuery = true)
    Optional<document> findById_demande(@Param("id_demande") Long id_demande);
}
