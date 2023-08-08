package com.laioffer.twitch.user;

import com.laioffer.twitch.external.model.RegisterBody;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    @ResponseStatus(value = HttpStatus.OK)
    public void register(@RequestBody RegisterBody body) {
        userService.register(body.username(), body.password(), body.firstName(), body.lastName());
    }

    @GetMapping("/checkSession")
    public ResponseEntity<Boolean> checkSession(HttpServletRequest request) {
        return new ResponseEntity<>(request.getSession(false) != null, HttpStatus.OK);
    }
}
