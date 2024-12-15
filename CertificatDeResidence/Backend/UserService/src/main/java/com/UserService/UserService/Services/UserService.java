package com.UserService.UserService.Services;

import com.UserService.UserService.DTOs.UserDTO;
import com.UserService.UserService.Models.User;
import com.UserService.UserService.Repositories.UserRepository;
import com.UserService.UserService.Utils.GenerateDTOs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    GenerateDTOs generateDTOs;

    public List<UserDTO> findAll() {
        List<User> users;
       try{
           users=userRepository.findAll();
       } catch (Exception e) {
           return null;
       }
       ArrayList<UserDTO> usersDto=new ArrayList<>();
       for(User user:users){
           UserDTO tmp=generateDTOs.generateUserDto(user);
           usersDto.add(tmp);
       }
       return usersDto;
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
