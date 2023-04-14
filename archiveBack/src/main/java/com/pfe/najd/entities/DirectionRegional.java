package com.pfe.najd.entities;

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

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class DirectionRegional extends AbstractEntity {

    private String codeDirection;
    private String libelleDirection;
    private String lieuArchive;
    private String lieuArchiveSecAge;
    @OneToMany(mappedBy = "directeur", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.LAZY)
    private List<StructureCentral> structureCentrals = new ArrayList<>();
//    @OneToMany(mappedBy = "directionRegional", fetch = FetchType.LAZY)
//    private List<User> users = new ArrayList<>();
}
