package com.pfe.najd.service;

import com.pfe.najd.exeptions.UserExistsException;
import com.pfe.najd.dao.RoleDao;
import com.pfe.najd.dao.UserDao;
import com.pfe.najd.entities.Role;
import com.pfe.najd.entities.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserService {

    private UserDao userDao;
    private RoleDao roleDao;
    private PasswordEncoder passwordEncoder;




    public UserService(UserDao userDao, RoleDao roleDao, PasswordEncoder passwordEncoder) {
        this.userDao = userDao;
        this.roleDao = roleDao;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(String username, String password, String lieuAffectation, Set<String> roleNames) {

        if (userDao.findByUsername(username).isPresent()) {
            throw new UserExistsException("utilisateur " + username + " deja exist.");
        }

            User user = new User();
            user.setUsername(username);
            user.setPassword(passwordEncoder.encode(password));
            user.setLieuAffectation(lieuAffectation);

            Set<Role> roles = roleNames.stream()
                    .map(roleName -> roleDao.findByRoleName(roleName).orElseThrow(() -> new RuntimeException("Role introuvable")))
                    .collect(Collectors.toSet());

            user.setRoles(roles);
            return userDao.save(user);

    }
}
