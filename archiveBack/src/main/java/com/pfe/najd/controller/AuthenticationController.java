package com.pfe.najd.controller;

import com.pfe.najd.service.AuthenticationService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/auth")
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationController(AuthenticationService authenticationService, AuthenticationManager authenticationManager) {
        this.authenticationService = authenticationService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/sign-in")
    public Map<String, String> jwtToken(@RequestBody SignInRequest signInRequest){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signInRequest.getUsername(), signInRequest.getPassword())
        );
        return authenticationService.generateJwtToken(authentication);
    }

//    @PostMapping("/sign-in")
//    public Map<String, String> jwtToken(@RequestParam String username, @RequestParam String password){
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(username, password)
//        );
//        return authenticationService.generateJwtToken(authentication);
//    }

    @Getter
    @Setter
    public static class SignInRequest {
        private String username;
        private String password;

        // Add getters and setters for 'username' and 'password' here
    }
}
