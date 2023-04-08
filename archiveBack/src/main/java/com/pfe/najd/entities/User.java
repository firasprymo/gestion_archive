package com.pfe.najd.entities;

// Other imports...


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User implements Serializable{
    @Serial
    private static final long serialVersionUID = 805830910536566911L;
    @Id
    private String username;
    private String password;
    private String lieuAffectation;

    @ManyToMany
    @JoinTable(
            name = "user_roles",
            joinColumns = @JoinColumn(name = "username"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))

    private Set<Role> roles;

    // Relationships with DirectionRegional, StructureCentral, and Agence
    @ManyToOne
    @JoinColumn(name = "direction_regional_code", referencedColumnName = "codeDirection", insertable = false, updatable = true)
    private DirectionRegional directionRegional;

    @ManyToOne
    @JoinColumn(name = "structure_central_code", referencedColumnName = "codeStructure", insertable = false, updatable = true)
    private StructureCentral structureCentral;

    @ManyToOne
    @JoinColumn(name = "agence_code", referencedColumnName = "codeAgence", insertable = false, updatable = true)
    private Agence agence;


    //ask if i should be able to see the collumns in the database
}