package com.pfe.najd.service;

import com.pfe.najd.dao.StructureCentralDao;
import com.pfe.najd.entities.Agence;
import com.pfe.najd.entities.StructureCentral;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StructureCentralService {

    @Autowired
    private StructureCentralDao structureCentralDao;
    @Autowired
    private AgenceService agenceService;

//    public StructureCentral createStructureCentral(StructureCentral structureCentral){
//        if (structureCentralDao.existsByCodeStructure(structureCentral.getCodeStructure())){
//            throw new RuntimeException("Structure Central with code " + structureCentral.getCodeStructure() + " already exists.");
//        }else {
//            return structureCentralDao.save(structureCentral);
//        }
//    }

    public List<StructureCentral> getAllStructureCentral(){
        return structureCentralDao.findAll();
    }
    public Optional<StructureCentral> getStructureCentralById(String codeStructure) {
        return structureCentralDao.findById(codeStructure);
    }

//    public List<StructureCentral> findByCodeDirectionRegional(String codeDirection) {
//        return structureCentralDao.findByCodeDirectionRegional(codeDirection);
//    }
public boolean existsByCodeStructure(String codeStructure) {
    return structureCentralDao.existsByCodeStructure(codeStructure);
}

    public StructureCentral updateStructureCentral(String codeStructure,StructureCentral updatedStructureCentral){
        Optional<StructureCentral> existingStructureCentralOptional = structureCentralDao.findById(codeStructure);
        if(existingStructureCentralOptional.isPresent()){
            StructureCentral existingStructureCentral = existingStructureCentralOptional.get();
            if (updatedStructureCentral.getLibelleStructure()!=null){
                existingStructureCentral.setLibelleStructure(updatedStructureCentral.getLibelleStructure());
            }
            if (updatedStructureCentral.getLieuArchive()!=null){
                existingStructureCentral.setLieuArchive(updatedStructureCentral.getLieuArchive());
            }
            return structureCentralDao.save(existingStructureCentral);
        }else {
            throw new RuntimeException("Structure Central avec Code"+ codeStructure +"deja existe");
        }

    }

    public void deleteStructureCentralById(String codeStructure){
        if(structureCentralDao.existsByCodeStructure(codeStructure)){
            structureCentralDao.deleteById(codeStructure);
        }else {
            throw new RuntimeException("Structure Central :" + codeStructure + "n existe pas") ;
        }
    }

    public Agence addNewAgence(String structureCentralCode, Agence agence ){
        Optional<StructureCentral> structureCentralOptional = structureCentralDao.findById(structureCentralCode);
        if(structureCentralOptional.isPresent()){
            StructureCentral structureCentral = structureCentralOptional.get();
            if(agenceService.existsByCodeAgence(agence.getCodeAgence())){
                throw new RuntimeException("Agence avec code "+ agence.getCodeAgence()+ "deja existe ");
            }else {
                agence.setStructureCentral(structureCentral);
                structureCentral.getAgences().add(agence);
                structureCentralDao.save(structureCentral);
                return agence;
            }
        }else {
            throw new RuntimeException("Structure Central avec code "+ structureCentralCode + "n existe pas ");
        }
    }
    public List<StructureCentral> getStructureCentralByCodeDirection(String codeDirection) {
        return structureCentralDao.findByDirectionRegional_CodeDirection(codeDirection);
    }
    public List<StructureCentral> getStrucutureCentralByName(String libelleDirection){
        return structureCentralDao.findStructureCentralByLibelleStructureIgnoreCase(libelleDirection);
    }




}
