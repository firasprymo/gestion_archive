package com.pfe.najd.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serial;
import java.io.Serializable;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Nomenclature implements Serializable {
    @Serial
    private static final long serialVersionUID = -9124781203403265292L;
    @Id
    private String codeNomenclature;
    private String designationNomenclature;
    private String dureeConservationPremAge ;
    private String dureeConservationSecAge;
    private Boolean valeurHistoriqueTroiAge ;

//    @OneToMany(mappedBy = "codeNomenclature", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//    private List<Document> documents;

}
