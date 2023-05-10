package com.pfe.najd.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    private String username;
    private String password;
    private String email;
    private String lieuAffectation;
    private String roles ;
    private Long directionRegional;
    private Long centreArchive;
    private Long centrePreArchive;
    private Long structureCentral;
    private Long agence;


}