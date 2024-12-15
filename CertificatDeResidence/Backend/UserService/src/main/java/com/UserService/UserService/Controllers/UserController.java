package com.UserService.UserService.Controllers;

import com.UserService.UserService.DTOs.PasswordJson;
import com.UserService.UserService.DTOs.UserDTO;
import com.UserService.UserService.Enums.Type_Employe;
import com.UserService.UserService.Models.User;
import com.UserService.UserService.Models.Zone;
import com.UserService.UserService.Repositories.UserRepository;
import com.UserService.UserService.Services.UserService;
import com.UserService.UserService.Utils.AuthCheck;
import com.UserService.UserService.Utils.GenerateDTOs;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {
    @Value("${Authentication_HostName}")
    private String Authentication_Host;
    @Autowired
    UserService userService;
    @Autowired
    private GenerateDTOs generateDTOs;
    @Autowired
    RestTemplate restTemplate;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    AuthCheck authCheck;

    @GetMapping("/get/all")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.findAll();
        if(users!=null)
            return new ResponseEntity<>(users, HttpStatus.OK);
        return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/add")
    public ResponseEntity<String> addUser(@RequestBody User user) {
        Optional<User> fieldsUsed = userRepository.findUserByNumImmatriculation(user.getNum_immatriculation());
        if (fieldsUsed.isPresent())
            return new ResponseEntity<>("N° Immatriculation deja utilisé", HttpStatus.BAD_REQUEST);
        fieldsUsed = userRepository.findUserByCin(user.getCin());
        if (fieldsUsed.isPresent())
            return new ResponseEntity<>("CIN deja Utilisé", HttpStatus.BAD_REQUEST);
        if (user.getType_employe().equals(Type_Employe.Caïd)) {
            fieldsUsed = userRepository.findCaidByZone(user.getZone().getId_zone());
            if (fieldsUsed.isPresent())
                return new ResponseEntity<>("Un Caïd existe deja dans cette zone", HttpStatus.BAD_REQUEST);
        }
        String password = restTemplate.postForObject("http://" + Authentication_Host + ":8083/authenticate/hashPassword",
                user.getPassword(),
                String.class);
        user.setPassword(password);
        User newUser = userService.addUser(user);
        if (newUser != null)
            return new ResponseEntity<>("Employee crée", HttpStatus.CREATED);
        return new ResponseEntity<>("Une Erreur est survenue", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<UserDTO> getUser(@PathVariable int id) {
        Optional<User> user = userService.findById(id);
        if(user!=null)
            if(user.isPresent()) {
                UserDTO userDTO = generateDTOs.generateUserDto(user.get());
                return new ResponseEntity<>(userDTO, HttpStatus.OK);
            }
            else
                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        else
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
