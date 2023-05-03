package com.pfe.najd.service.implementation;

import com.pfe.najd.dao.RoleDao;
import com.pfe.najd.dao.UserDao;
import com.pfe.najd.entities.Agence;
import com.pfe.najd.entities.Role;
import com.pfe.najd.entities.User;
import com.pfe.najd.exeptions.UserExistsException;
import com.pfe.najd.repository.UserRepository;
import com.pfe.najd.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserDao userDao;
    private final UserRepository userRepository;
    private final RoleDao roleDao;
    private final PasswordEncoder passwordEncoder;




    public User createUser(User user) {

        if (userDao.findByUsername(user.getUsername()).isPresent()) {
            throw new UserExistsException("utilisateur " + user.getUsername() + " deja exist.");
        }

        User users = new User();
        users.setUsername(user.getUsername());
        users.setPassword(passwordEncoder.encode(user.getPassword()));
        users.setAgence(user.getAgence());
        users.setStructureCentral(user.getStructureCentral());
        users.setDirectionRegional(user.getDirectionRegional());

        Set<Role> roles = user.getRoles().stream()
                .map(roleName -> roleDao.findByRoleName(roleName.getRoleName()).orElseThrow(() -> new RuntimeException("Role introuvable")))
                .collect(Collectors.toSet());

        user.setRoles(roles);
        return userDao.save(user);

    }

    public User getMe(String username) {
        return userRepository.findByUsername(username);

    }


    @Transactional
    public Page<User> pageUsers(Pageable pageable) {
        Page<User> users = userDao.findAll(pageable);

        return new PageImpl<>(users.getContent(), users.getPageable(), users.getTotalElements());

    }


    public void deleteUserById(Long id) {
        if (userDao.existsById(id)) {
            userDao.deleteById(id);
        } else {
            throw new RuntimeException("User :" + id + "n'existe pas");
        }
    }
}
