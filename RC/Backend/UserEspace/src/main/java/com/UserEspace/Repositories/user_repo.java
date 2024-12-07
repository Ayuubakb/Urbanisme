package com.UserEspace.Repositories;

import com.UserEspace.Models.user;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface user_repo extends JpaRepository<user, Float> {
  //if email exists
  boolean existsByEmail(String email);

  user findByEmail(String email);
}
