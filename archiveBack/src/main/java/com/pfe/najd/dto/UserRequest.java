package com.pfe.najd.dto;

import com.pfe.najd.entities.Agence;
import com.pfe.najd.entities.DirectionRegional;
import com.pfe.najd.entities.Role;
import com.pfe.najd.entities.StructureCentral;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

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
    private Long structureCentral;
    private Long agence;


}