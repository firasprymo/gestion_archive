package com.pfe.najd.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DirectionRegional implements Serializable {

    @Serial
    private static final long serialVersionUID = -2556943212998058322L;
    @Id
    private String codeDirection;
    private String libelleDirection;
    private String lieuArchive;
    private String lieuArchiveSecAge;
    @JsonManagedReference
    @OneToMany(mappedBy = "directionRegional", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StructureCentral> structureCentrals = new ArrayList<>();
    @OneToMany(mappedBy = "directionRegional", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, fetch = FetchType.LAZY)
    private List<User> users = new ArrayList<>();
}
