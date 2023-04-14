package com.pfe.najd.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


@Data
@Entity
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Table
public class StructureCentral extends AbstractEntity {


    private String codeStructure;
    private String libelleStructure;
    private String lieuArchive;
    private String lieuArchiveSecAge;


    @ManyToOne
    @JoinColumn(name = "directeur_id", nullable = true)
    @JsonIgnoreProperties("structureCentrals")
    private DirectionRegional directeur;
    @OneToMany(mappedBy = "structure")
    private List<Agence> agences;
//    @OneToMany(mappedBy = "structureCentral", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, fetch = FetchType.LAZY)
//    private List<User> users = new ArrayList<>();
}
