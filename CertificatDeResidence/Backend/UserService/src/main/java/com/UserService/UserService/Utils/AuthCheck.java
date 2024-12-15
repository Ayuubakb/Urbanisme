package com.UserService.UserService.Utils;

import com.UserService.UserService.Enums.Type_Employe;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;

@Service
public class AuthCheck {
    public Boolean isLoggedIn(HttpSession session) {
        return session.getAttribute("userId") != null;
    }

    public Boolean isCaid(HttpSession session) {
        return isLoggedIn(session) && session.getAttribute("type_employe").equals(Type_Employe.Caïd);
    }
}
