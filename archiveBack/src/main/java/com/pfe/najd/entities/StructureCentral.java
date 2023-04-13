package com.pfe.najd.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@Table
public class StructureCentral extends AbstractEntity {


    private String codeStructure;
    private String libelleStructure;
    private String lieuArchive;
    private String lieuArchiveSecAge;

    
    @ManyToOne
    @JoinColumn(name = "direction_regional_code",nullable = false)
    private DirectionRegional directionRegional;

    @JsonManagedReference
    @OneToMany(mappedBy = "structureCentral", cascade = CascadeType.ALL,fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Agence> agences = new ArrayList<>();
    @OneToMany(mappedBy = "structureCentral", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, fetch = FetchType.LAZY)
    private List<User> users = new ArrayList<>();
}
