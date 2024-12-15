package com.AuthenticationService.AuthenticationService.Repositories;

import com.AuthenticationService.AuthenticationService.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("SELECT U FROM User U where U.num_immatriculation=?1")
    Optional<User> findByNumImmatriculation(String numImmatriculation);
}
