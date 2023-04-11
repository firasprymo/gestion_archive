package com.pfe.najd.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Document implements Serializable {

    @Serial
    private static final long serialVersionUID = -748245647728840620L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String codeNomenclature;
    private String nomberPage;
    private LocalDateTime dateCreation;
    private LocalDateTime dateReception;
    private String codeLieuArchive;
    private String lieuArchive;
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
