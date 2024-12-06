package com.ClientSpace.Repositories;

import com.ClientSpace.Models.demande;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface demande_repo extends JpaRepository<demande, Long> {

    List<demande> findAllById_user(Long id_user);
}
