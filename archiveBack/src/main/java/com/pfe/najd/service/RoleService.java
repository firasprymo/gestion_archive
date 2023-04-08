package com.pfe.najd.service;

import com.pfe.najd.entities.Role;
import com.pfe.najd.dao.RoleDao;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {
    private final RoleDao roleDao;

    public RoleService(RoleDao roleDao) {
        this.roleDao = roleDao;
    }

    public Optional<Role> findRoleByName(String roleName) {
        return roleDao.findByRoleName(roleName);
    }

    public List<Role> findAll() {
        return roleDao.findAll();
    }

    public Role save(Role role) {
        return roleDao.save(role);
    }
    public Role createRoleIfNotFound(String roleName) {
        Optional<Role> optionalRole = roleDao.findByRoleName(roleName);
        if (optionalRole.isPresent()) {
            return optionalRole.get();
        } else {
            Role newRole = new Role();
            newRole.setRoleName(roleName);
            return roleDao.save(newRole);
        }
    }
    
}

