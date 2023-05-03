package com.pfe.najd.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import javax.persistence.Entity;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@Table(name = "agence")
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class Agence extends AbstractEntity {

    private String codeAgence;

    private String libelleAgence;
    private String lieuArchive;
    private String lieuArchiveSecAge;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="structure_id",nullable = true)
    private StructureCentral structure;
//
//    @OneToMany(mappedBy = "agence", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, fetch = FetchType.LAZY)
//    private List<User> users = new ArrayList<>();


}

