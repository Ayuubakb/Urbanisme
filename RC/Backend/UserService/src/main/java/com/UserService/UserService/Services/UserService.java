package com.UserService.UserService.Services;

import com.UserService.UserService.Models.User;
import com.UserService.UserService.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> findAll() {
        List<User> users;
       try{
           users=userRepository.findAll();
       } catch (Exception e) {
           return null;
       }
       return users;
    }

    public Optional<User> findById(int id) {
        Optional<User> user;
        try{
            user=userRepository.findById(id);
        }catch (Exception e) {
            return null;
        }
        return user;
    }

    public User addUser(User user) {
        User newUser;
        try {
            newUser = userRepository.save(user);
        } catch (Exception e) {
            System.out.println(e.getMessage());
           return null;
        }
        return newUser;
    }
}
