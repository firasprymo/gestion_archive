package com.pfe.najd.service;

import com.pfe.najd.entities.CentreArchive;
import com.pfe.najd.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Set;

public interface UserService {
    User getMe(String username);
    User createUser(User user);
    Page<User> pageUsers(Pageable pageable);

}
