package com.ClientSpace.Repositories;

import com.ClientSpace.Models.user;
import org.springframework.data.jpa.repository.JpaRepository;

public interface user_repo extends JpaRepository<user, Float> {
  //if email exists
  boolean existsByEmail(String email);

  user findByEmail(String email);

}
