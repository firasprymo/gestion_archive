package com.pfe.najd.controller;

import com.pfe.najd.entities.CentreArchive;
import com.pfe.najd.entities.StructureCentral;
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

import java.util.Optional;
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
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
        Optional<User> user = userService.getUserById(id);
        if (user.isPresent()) {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/Me")
    public User getMe(@RequestParam  String username) {
        return userService.getMe(username);
    }
    @DeleteMapping("/delete-user/{id}")
    public ResponseEntity<Void> deleteUserById(@PathVariable("id") Long id){
        try{
            userService.deleteUserById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (RuntimeException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN')")
    @PatchMapping("/{id}")
    public ResponseEntity<User> updateStructureCentral(@PathVariable("id") Long id, @RequestBody User updatedUser){
        try{
            User updated = userService.updateUser(id, updatedUser);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        }catch (RuntimeException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
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