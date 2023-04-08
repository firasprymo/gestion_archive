package com.pfe.najd.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serial;
import java.io.Serializable;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class CentreArchive implements Serializable {
    @Serial
    private static final long serialVersionUID = -7475562284091640571L;
    @Id
    private String codeCentreArchive; 
    private String libelleCentreArchive;


}
