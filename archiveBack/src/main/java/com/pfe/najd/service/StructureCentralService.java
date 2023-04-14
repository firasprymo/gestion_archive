package com.pfe.najd.service;

import com.pfe.najd.dao.StructureCentralDao;
import com.pfe.najd.entities.Agence;
import com.pfe.najd.entities.CentreArchive;
import com.pfe.najd.entities.StructureCentral;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface StructureCentralService {


    public StructureCentral createStructureCentral(StructureCentral structureCentral);

    public List<StructureCentral> getAllStructureCentral();
    public Optional<StructureCentral> getStructureCentralById(Long id) ;

//    public List<StructureCentral> findByCodeDirectionRegional(String codeDirection) {
//        return structureCentralDao.findByCodeDirectionRegional(codeDirection);
//    }
public boolean existsByCodeStructure(Long id) ;

    public StructureCentral updateStructureCentral(Long id,StructureCentral updatedStructureCentral);

    public void deleteStructureCentralById(Long id);

    public Agence addNewAgence(Long id, Agence agence );
    public List<StructureCentral> getStructureCentralByCodeDirection(String codeDirection) ;
    public List<StructureCentral> getStrucutureCentralByName(String libelleDirection);
    Page<StructureCentral> pageStructureCentrals(Pageable pageable);



}
