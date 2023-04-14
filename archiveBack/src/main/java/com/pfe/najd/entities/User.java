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
    private String lieuAffectation;

    @ManyToMany
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))

    private Set<Role> roles;

    // Relationships with DirectionRegional, StructureCentral, and Agence
//    @ManyToOne
//    @JoinColumn(name = "direction_regional_code", referencedColumnName = "codeDirection", insertable = false, updatable = true)
//    private DirectionRegional directionRegional;
//
//    @ManyToOne
//    @JoinColumn(name = "structure_central_code", referencedColumnName = "codeStructure", insertable = false, updatable = true)
//    private StructureCentral structureCentral;

//    @ManyToOne
//    @JoinColumn(name = "agence_code", referencedColumnName = "codeAgence", insertable = false, updatable = true)
//    private Agence agence;


    //ask if i should be able to see the collumns in the database
}