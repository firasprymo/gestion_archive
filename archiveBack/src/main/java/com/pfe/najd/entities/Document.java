package com.pfe.najd.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pfe.najd.Enum.DocumentStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Document extends AbstractEntity{

    private String nomberPage;
    private String codeLieuArchive;
    private LocalDate maturitePremAge;
    private LocalDate maturiteSecAge;
    private String lieuArchive;
    @ManyToOne
    @JoinColumn(name="nomenclature_id",nullable = true)
    @JsonIgnoreProperties("documents")
    private Nomenclature nomenclature;
    @Enumerated(EnumType.STRING)
    private DocumentStatus Status ;
    //TODO finish the document
    /*
        -> the document can get his location based on the foreign key of the user that created it
        -> you can filter the document based on his key "located" :
        if(located == "deleted") :
        if (located[:2] == DR the file is in the DirectionRegional ) :
            getDocumentDirectionRegional(located)
        elif( located[:2] == SC the file is in the StructureCentral) :
            getDocumentStructureCentral(located)
        elif(located[:2] == AG the file is in the Agence ) :
            getDocumentAgence(located)
        elif(located[:2] == "CA" the file is in the centreArchive) :
            getDocumentCentreArchive(located)
        else the file is in centrePreArchive:



    */
}
