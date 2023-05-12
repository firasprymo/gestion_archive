package com.pfe.najd.service.implementation;

import com.pfe.najd.dao.AgenceDao;
import com.pfe.najd.dao.DirectionRegionalDao;
import com.pfe.najd.dao.RoleDao;
import com.pfe.najd.dao.StructureCentralDao;
import com.pfe.najd.dto.UserRequest;
import com.pfe.najd.entities.*;
import com.pfe.najd.exeptions.DuplicateUsernameException;
import com.pfe.najd.exeptions.UserExistsException;
import com.pfe.najd.repository.CentreArchiveRepository;
import com.pfe.najd.repository.CentrePreArchiveRepository;
import com.pfe.najd.repository.UserRepository;
import com.pfe.najd.service.UserService;
import lombok.RequiredArgsConstructor;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
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
    private final CentreArchiveRepository centreArchiveRepository;
    private final CentrePreArchiveRepository centrePreArchiveRepository;
    private final RoleDao roleDao;
    private final PasswordEncoder passwordEncoder;


    public User createUser(UserRequest user) {
        try {
            User users = new User();
            users.setUsername(user.getUsername());
            users.setPassword(passwordEncoder.encode(user.getPassword()));
            users.setEmail(user.getEmail());
            if (user.getAgence() != null) {

                Agence agence = agenceDao.findById(user.getAgence())
                        .orElseThrow(() -> new RuntimeException("Agence doesnt exisr"));
                users.setAgence(agence);
            }
            if (user.getStructureCentral() != null) {

                StructureCentral structureCentral = structureCentralDao.findById(user.getStructureCentral())
                        .orElseThrow(() -> new RuntimeException("Structure Central doesnt exisr"));
                users.setStructureCentral(structureCentral);
            }
            if (user.getDirectionRegional() != null) {

                DirectionRegional directionRegional = directionRegionalDao.findById(user.getDirectionRegional())
                        .orElseThrow(() -> new RuntimeException("Direction Regional doesnt exisr"));
                users.setDirectionRegional(directionRegional);
            }
            if (user.getCentreArchive() != null) {

                CentreArchive centreArchive = centreArchiveRepository.findById(user.getCentreArchive())
                        .orElseThrow(() -> new RuntimeException("Centre archive doesnt exisr"));
                users.setCentreArchive(centreArchive);

            }
            if (user.getCentrePreArchive() != null) {

                CentrePreArchive centrePreArchive = centrePreArchiveRepository.findById(user.getCentrePreArchive())
                        .orElseThrow(() -> new RuntimeException("Centre Pre Archive doesnt exisr"));
                users.setCentrePreArchive(centrePreArchive);

            }
            if (user.getAgence() != null) {

                Agence agence = agenceDao.findById(user.getAgence())
                        .orElseThrow(() -> new RuntimeException("Agence doesnt exisr"));
                users.setLieuAffectation(agence.getCodeAgence());
            } else if (user.getStructureCentral() != null) {

                StructureCentral structureCentral = structureCentralDao.findById(user.getStructureCentral())
                        .orElseThrow(() -> new RuntimeException("Structure Central doesnt exisr"));
                users.setLieuAffectation(structureCentral.getCodeStructure());
            } else if (user.getDirectionRegional() != null) {

                DirectionRegional directionRegional = directionRegionalDao.findById(user.getDirectionRegional())
                        .orElseThrow(() -> new RuntimeException("Direction Regional doesnt exisr"));
                users.setLieuAffectation(directionRegional.getCodeDirection());
            } else if (user.getCentreArchive() != null) {

                CentreArchive centreArchive = centreArchiveRepository.findById(user.getCentreArchive())
                        .orElseThrow(() -> new RuntimeException("Centre archive doesnt exisr"));
                users.setLieuAffectation(centreArchive.getCodeCentreArchive());

            } else if (user.getCentrePreArchive() != null) {

                CentrePreArchive centrePreArchive = centrePreArchiveRepository.findById(user.getCentrePreArchive())
                        .orElseThrow(() -> new RuntimeException("Centre Pre Archive doesnt exisr"));
                users.setLieuAffectation(centrePreArchive.getCodeCentrePreArchive());

            }
            if (user.getRoles() != null) {
                Role role = roleDao.findTopByRoleName(user.getRoles());
                users.getRoles().add(role);
            }
            return userRepository.save(users);
        } catch (DataIntegrityViolationException e) {
            if (e.getCause() instanceof ConstraintViolationException) {
                throw new DuplicateUsernameException("Username already exists");
            }
            throw e;
        }
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

    public User updateUser(Long id, UserRequest updatedUser) {
        Optional<User> existingUserOptional = userRepository.findById(id);
        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();
            if (updatedUser.getUsername() != null) {
                existingUser.setUsername(updatedUser.getUsername());
            }
            if (updatedUser.getEmail() != null) {
                existingUser.setEmail(updatedUser.getEmail());
            }
            if (updatedUser.getRoles() != null) {
                Role role = roleDao.findTopByRoleName(updatedUser.getRoles());

                existingUser.getRoles().add(role);
            }
            if (updatedUser.getStructureCentral() != null) {
                StructureCentral structureCentral = structureCentralDao.findById(updatedUser.getStructureCentral())
                        .orElseThrow(() -> new RuntimeException("Agence doesnt exisr"));
                existingUser.setStructureCentral(structureCentral);
                existingUser.setLieuAffectation(structureCentral.getCodeStructure());

            } else if (updatedUser.getAgence() != null) {
                Agence agence = agenceDao.findById(updatedUser.getAgence())
                        .orElseThrow(() -> new RuntimeException("Agence doesnt exisr"));
                existingUser.setAgence(agence);
                existingUser.setLieuAffectation(agence.getCodeAgence());

            } else if (updatedUser.getDirectionRegional() != null) {
                DirectionRegional directionRegional = directionRegionalDao.findById(updatedUser.getDirectionRegional())
                        .orElseThrow(() -> new RuntimeException("Direction Regional doesnt exisr"));
                existingUser.setDirectionRegional(directionRegional);
                existingUser.setLieuAffectation(directionRegional.getCodeDirection());

            } else if (updatedUser.getCentreArchive() != null) {
                CentreArchive centreArchive = centreArchiveRepository.findById(updatedUser.getCentreArchive())
                        .orElseThrow(() -> new RuntimeException("Direction Regional doesnt exisr"));
                existingUser.setCentreArchive(centreArchive);
                existingUser.setLieuAffectation(centreArchive.getCodeCentreArchive());

            } else if (updatedUser.getCentrePreArchive() != null) {
                CentrePreArchive centrePreArchive = centrePreArchiveRepository.findById(updatedUser.getCentrePreArchive())
                        .orElseThrow(() -> new RuntimeException("Direction Regional doesnt exisr"));
                existingUser.setCentrePreArchive(centrePreArchive);
                existingUser.setLieuAffectation(centrePreArchive.getCodeCentrePreArchive());

            }
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
