package com.pfe.najd.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Nomenclature extends AbstractEntity {
    private String designationNomenclature;
    private String dureeConservationPremAge;
    private String dureeConservationSecAge;
    private Boolean valeurHistoriqueTroiAge;
    @OneToMany(mappedBy = "nomenclature")
    private List<Document> documents;

}
