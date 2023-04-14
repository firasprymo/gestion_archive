package com.pfe.najd.dao;

import com.pfe.najd.entities.Agence;
import com.pfe.najd.entities.StructureCentral;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AgenceDao extends JpaRepository<Agence, Long> {
    boolean existsByCodeAgence(String codeAgence);

    List<Agence> findAll();

//    List<Agence> findByStructureCentral_CodeStructure(String codeStructure);

    List<Agence> findByLibelleAgenceContainingIgnoreCase(String libelleAgence);

}
