package com.pfe.najd.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class TestRestApi {
    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN')")
    @GetMapping("/dataTest")
    public Map<String,Object> dataTest(){
        return Map.of("message","data test");
    }
}
