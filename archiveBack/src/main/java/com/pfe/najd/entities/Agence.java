package com.pfe.najd.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import javax.persistence.Entity;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Agence implements Serializable {

    @Serial
    private static final long serialVersionUID = 5085650700457050889L;
    @Id
    private String codeAgence;

    private String libelleAgence;
    private String lieuArchive;
    private String lieuArchiveSecAge;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "structure_central_code",nullable = false)
    private StructureCentral structureCentral;

    @OneToMany(mappedBy = "agence", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, fetch = FetchType.LAZY)
    private List<User> users = new ArrayList<>();


}

