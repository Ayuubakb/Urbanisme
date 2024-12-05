package com.UserService.UserService.Controllers;

import com.UserService.UserService.Models.User;
import com.UserService.UserService.Services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/get/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.findAll();
        if(users!=null)
            return new ResponseEntity<>(users, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/add")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        User newUser = userService.addUser(user);
        if(newUser!=null)
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<User> getUser(@PathVariable int id) {
        Optional<User> user = userService.findById(id);
        if(user!=null)
            if(user.isPresent())
                return new ResponseEntity<>(user.get(), HttpStatus.OK);
            else
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
