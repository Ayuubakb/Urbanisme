package com.AuthenticationService.AuthenticationService.Services;

import com.AuthenticationService.AuthenticationService.Models.User;
import com.AuthenticationService.AuthenticationService.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginServices {
    @Autowired
    UserRepository userRepository;
    @Value("${BcryptSalt}")
    private int bcryptRounds;

    public User login(String num_immatriculation, String password) {
        Optional<User> user = userRepository.findByNumImmatriculation(num_immatriculation);
        if(user.isPresent()) {
            User u = user.get();
            if(encoder().matches(password,u.getPassword()))
                return u;
            return null;
        }
        System.out.println("Num immatriculation: " + num_immatriculation + " Not Found");
        return null;
    }

    public BCryptPasswordEncoder encoder(){
        return new BCryptPasswordEncoder(bcryptRounds);
    }
}
