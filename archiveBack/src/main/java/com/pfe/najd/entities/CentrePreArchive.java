package com.pfe.najd.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serial;
import java.io.Serializable;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CentrePreArchive implements Serializable {
    @Serial
    private static final long serialVersionUID = -1849243299981143230L;
    @Id
    private String codeCentrePreArchive;
    private String libelleCentrePreArchive;


}
