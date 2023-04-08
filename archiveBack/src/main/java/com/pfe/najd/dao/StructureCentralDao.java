package com.pfe.najd.dao;

import com.pfe.najd.entities.StructureCentral;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface StructureCentralDao extends JpaRepository<StructureCentral,String> {
    boolean existsByCodeStructure(String codeStructure);
    List<StructureCentral> findAll();
    List<StructureCentral> findByDirectionRegional_CodeDirection(String codeDirection);
    List<StructureCentral> findStructureCentralByLibelleStructureIgnoreCase(String libelleStructure);
}
