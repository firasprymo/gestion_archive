package com.pfe.najd.service;

import com.pfe.najd.dto.UserRequest;
import com.pfe.najd.entities.CentreArchive;
import com.pfe.najd.entities.StructureCentral;
import com.pfe.najd.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;
import java.util.Set;

public interface UserService {
    User getMe(String username);
    User createUser(UserRequest user);
    Page<User> pageUsers(Pageable pageable);
    void deleteUserById(Long id);
    Optional<User> getUserById(Long id);
    User updateUser(Long id, UserRequest updatedUser);

}
