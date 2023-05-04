package com.pfe.najd.service.implementation;

import com.pfe.najd.dao.AgenceDao;
import com.pfe.najd.dao.DirectionRegionalDao;
import com.pfe.najd.dao.RoleDao;
import com.pfe.najd.dao.StructureCentralDao;
import com.pfe.najd.entities.*;
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
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final AgenceDao agenceDao;
    private final StructureCentralDao structureCentralDao;
    private final DirectionRegionalDao directionRegionalDao;
    private final RoleDao roleDao;
    private final PasswordEncoder passwordEncoder;


    public User createUser(User user) {

        User users = new User();
        users.setUsername(user.getUsername());
        users.setPassword(passwordEncoder.encode(user.getPassword()));
        users.setEmail(user.getEmail());
        Agence agence = agenceDao.findById(user.getAgence().getId())
                .orElseThrow(() -> new RuntimeException("Agence doesnt exisr"));
        users.setAgence(agence);
        users.setLieuAffectation(agence.getCodeAgence());
        StructureCentral structureCentral = structureCentralDao.findById(user.getStructureCentral().getId())
                .orElseThrow(() -> new RuntimeException("Structure Central doesnt exisr"));
        users.setLieuAffectation(structureCentral.getCodeStructure());
        users.setStructureCentral(structureCentral);
        DirectionRegional directionRegional = directionRegionalDao.findById(user.getDirectionRegional().getId())
                .orElseThrow(() -> new RuntimeException("Direction Regional doesnt exisr"));
        users.setLieuAffectation(directionRegional.getCodeDirection());
        users.setDirectionRegional(directionRegional);
        Set<Role> roles = user.getRoles().stream()
                .map(roleName -> roleDao.findByRoleName(roleName.getRoleName()).orElseThrow(() -> new RuntimeException("Role introuvable")))
                .collect(Collectors.toSet());
        users.setRoles(roles);
        return userRepository.save(users);

    }

    public User getMe(String username) {
        return userRepository.findByUsername(username).get();

    }


    public Page<User> pageUsers(Pageable pageable) {
        Page<User> users = userRepository.findAll(pageable);

        return new PageImpl<>(users.getContent(), users.getPageable(), users.getTotalElements());

    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User updateUser(Long id, User updatedUser) {
        Optional<User> existingUserOptional = userRepository.findById(id);
        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();
            return userRepository.save(existingUser);
        } else {
            throw new RuntimeException("User avec Code" + id + "deja existe");
        }

    }

    @Transactional
    public void deleteUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(RuntimeException::new);
        user.setAgence(null);
        user.setStructureCentral(null);
        user.setDirectionRegional(null);
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new RuntimeException("User :" + id + "n'existe pas");
        }
    }
}
