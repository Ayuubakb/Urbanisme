package com.AuthenticationService.AuthenticationService.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private int id;
    private String username;
    private String password;
    private String email;
    private String phone;
    private String address;
    private String firstname;
    private String lastname;

    public User(String username, String password, String email, String phone, String address, String firstname, String lastname) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.firstname = firstname;
        this.lastname = lastname;
    }
}
