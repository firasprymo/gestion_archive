package com.pfe.najd.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


@Data
@Entity
@Table
public class StructureCentral implements Serializable {
    @Serial
    private static final long serialVersionUID = 913875245402572279L;
    @Id
    private String codeStructure;
    private String libelleStructure;
    private String lieuArchive;
    private String lieuArchiveSecAge;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "direction_regional_code",nullable = false)
    private DirectionRegional directionRegional;

    @JsonManagedReference
    @OneToMany(mappedBy = "structureCentral", cascade = CascadeType.ALL,fetch = FetchType.LAZY, orphanRemoval = true)
    private List<Agence> agences = new ArrayList<>();
    @OneToMany(mappedBy = "structureCentral", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, fetch = FetchType.LAZY)
    private List<User> users = new ArrayList<>();
}
