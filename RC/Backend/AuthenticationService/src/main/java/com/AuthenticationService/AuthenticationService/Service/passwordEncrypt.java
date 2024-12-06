package com.AuthenticationService.AuthenticationService.Service;

import org.springframework.security.crypto.bcrypt.BCrypt;

public class passwordEncrypt {
  public static String encrypt(String password) {
    return BCrypt.hashpw(password, BCrypt.gensalt());
  }

  public static boolean checkPassword(String password, String hashedPassword) {
    return BCrypt.checkpw(password, hashedPassword);
  }
}
