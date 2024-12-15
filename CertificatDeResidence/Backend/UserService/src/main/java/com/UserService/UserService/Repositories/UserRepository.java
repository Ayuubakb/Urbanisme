package com.UserService.UserService.Repositories;

import com.UserService.UserService.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("SELECT U FROM User U WHERE U.num_immatriculation=?1")
    Optional<User> findUserByNumImmatriculation(String numImmatriculation);

    Optional<User> findUserByCin(String cin);

    @Query("select U from User U WHERE U.type_employe='Caïd' AND U.zone.id_zone=?1")
    Optional<User> findCaidByZone(int zone);
}
