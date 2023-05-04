package com.pfe.najd.entities;

// Other imports...


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class User extends AbstractEntity {
    private String username;
    @JsonIgnore
    private String password;
    private String email;
    private String lieuAffectation;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

//    // Relationships with DirectionRegional, StructureCentral, and Agence
//    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "direction_regional_code", referencedColumnName = "codeDirection")
//    private DirectionRegional directionRegional;
//
//    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "structure_central_code", referencedColumnName = "codeStructure")
//    private StructureCentral structureCentral;
//
//    @ManyToOne(cascade = CascadeType.ALL)
//    @JoinColumn(name = "code_agence", referencedColumnName = "codeAgence")
//    private Agence agence;
//
//
//    //ask if i should be able to see the collumns in the database
}