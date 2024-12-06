package com.AuthenticationService.AuthenticationService.Repo;

import com.AuthenticationService.AuthenticationService.Model.user;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface user_repo extends JpaRepository<user, Float> {
  //if email exists
  boolean existsByEmail(String email);

  user findByEmail(String email);

}
