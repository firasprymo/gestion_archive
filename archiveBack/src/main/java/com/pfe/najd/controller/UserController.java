package com.pfe.najd.controller;

import com.pfe.najd.entities.CentreArchive;
import com.pfe.najd.exeptions.UserExistsException;
import com.pfe.najd.entities.User;
import com.pfe.najd.service.UserService;
import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN','SCOPE_ROLE_RESPONSABLE')")
    @PostMapping("/register")
    public User createUser(@RequestBody CreateUserRequest request) {
        return userService.createUser(request.getUsername(), request.getPassword(), request.getLieuAffectation(), request.getRoleNames());
    }

    @GetMapping("/Me")
    public User getMe(@RequestParam  String username) {
        return userService.getMe(username);
    }

    @ExceptionHandler(UserExistsException.class)
    public ResponseEntity<String> handleUserExistsException(UserExistsException ex) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
    }
    @GetMapping("/get-all-users")
    public ResponseEntity<Page<User>> getAllUsers(Pageable pageable) {
        return ResponseEntity.ok().body(userService.pageUsers(pageable));
    }
    @Data
    static class CreateUserRequest {
        private String username;
        private String password;
        private String lieuAffectation;
        private Set<String> roleNames;
    }
}