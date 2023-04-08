package com.pfe.najd.service;

import javax.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RoleInitializer {

    @Autowired
    private RoleService roleService;

    @PostConstruct
    public void init() {
        roleService.createRoleIfNotFound("ROLE_AGENT");
        roleService.createRoleIfNotFound("ROLE_ADMIN");
        roleService.createRoleIfNotFound("ROLE_RESOPONSABLE");
        roleService.createRoleIfNotFound("ROLE_RESOPONSABLE_CENTRE_ARCHIVE");
        roleService.createRoleIfNotFound("ROLE_RESOPONSABLE_CENTRE_PRE_ARCHIVE");
    }
}
