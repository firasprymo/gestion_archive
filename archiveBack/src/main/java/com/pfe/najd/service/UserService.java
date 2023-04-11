package com.pfe.najd.service;

import com.pfe.najd.entities.User;

import java.util.Set;

public interface UserService {
    User getMe(String username);
    User createUser(String username, String password, String lieuAffectation, Set<String> roleNames);

}
