package com.pfe.najd.entities;

// Other imports...


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

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
    @Column(unique = true)
    private String username;
    private String password;
    private String email;
    private String lieuAffectation;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    //    // Relationships with DirectionRegional, StructureCentral, and Agence
    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "direction_regional", referencedColumnName = "id", nullable = true)
    private DirectionRegional directionRegional;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "structure_central", referencedColumnName = "id", nullable = true)
    private StructureCentral structureCentral;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "agence", referencedColumnName = "id", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private Agence agence;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "centreArchive", referencedColumnName = "id", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private CentreArchive centreArchive;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "centrePreArchive", referencedColumnName = "id", nullable = true)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private CentrePreArchive centrePreArchive;
//
//
//    //ask if i should be able to see the collumns in the database
}