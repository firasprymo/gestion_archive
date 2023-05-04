package com.pfe.najd.service;

import com.pfe.najd.entities.Agence;
import com.pfe.najd.entities.StructureCentral;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface StructureCentralService {


    StructureCentral createStructureCentral(StructureCentral structureCentral);

    List<StructureCentral> getAllStructureCentral();
    Optional<StructureCentral> getStructureCentralById(Long id) ;

//    List<StructureCentral> findByCodeDirectionRegional(String codeDirection) {
//        return structureCentralDao.findByCodeDirectionRegional(codeDirection);
//    }
boolean existsByCodeStructure(Long id) ;

    StructureCentral updateStructureCentral(Long id,StructureCentral updatedStructureCentral);

    void deleteStructureCentralById(Long id);

    Agence addNewAgence(Long id, Agence agence );
    List<StructureCentral> getStructureCentralByCodeDirection(String codeDirection) ;
    List<StructureCentral> getStrucutureCentralByName(String libelleDirection);
    Page<StructureCentral> pageStructureCentrals(Pageable pageable);



}
