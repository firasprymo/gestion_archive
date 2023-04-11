package com.pfe.najd.service.implementation;

import com.pfe.najd.dao.RoleDao;
import com.pfe.najd.dao.UserDao;
import com.pfe.najd.entities.Role;
import com.pfe.najd.entities.User;
import com.pfe.najd.exeptions.UserExistsException;
import com.pfe.najd.repository.UserRepository;
import com.pfe.najd.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserDao userDao;
    private final UserRepository userRepository;
    private final RoleDao roleDao;
    private final PasswordEncoder passwordEncoder;




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

    public User getMe(String username) {
        return userRepository.findByUsername(username);

    }
}
