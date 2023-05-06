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

    public Role findRoleByName(String roleName) {
        return roleDao.findFirstByRoleName(roleName);
    }

    public List<Role> findAll() {
        return roleDao.findAll();
    }

    public Role save(Role role) {
        return roleDao.save(role);
    }

    public Role createRoleIfNotFound(String roleName) {
        Role optionalRole = roleDao.findFirstByRoleName(roleName);
        if (!optionalRole.equals("null")) {
            return optionalRole;
        } else {
            Role newRole = new Role();
            newRole.setRoleName(roleName);
            return roleDao.save(newRole);
        }
    }

}

