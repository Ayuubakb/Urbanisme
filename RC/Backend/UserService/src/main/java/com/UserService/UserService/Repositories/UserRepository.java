package com.UserService.UserService.Repositories;

import com.UserService.UserService.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
}
