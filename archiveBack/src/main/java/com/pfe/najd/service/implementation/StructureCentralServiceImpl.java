package com.pfe.najd.service.implementation;

import com.pfe.najd.dao.StructureCentralDao;
import com.pfe.najd.entities.Agence;
import com.pfe.najd.entities.StructureCentral;
import com.pfe.najd.service.AgenceService;
import com.pfe.najd.service.StructureCentralService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StructureCentralServiceImpl implements StructureCentralService {

    private final StructureCentralDao structureCentralDao;
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
    public Optional<StructureCentral> getStructureCentralById(Long id) {
        return structureCentralDao.findById(id);
    }

//    public List<StructureCentral> findByCodeDirectionRegional(String codeDirection) {
//        return structureCentralDao.findByCodeDirectionRegional(codeDirection);
//    }
public boolean existsByCodeStructure(Long id) {
    return structureCentralDao.existsById(id);
}

    public StructureCentral updateStructureCentral(Long id,StructureCentral updatedStructureCentral){
        Optional<StructureCentral> existingStructureCentralOptional = structureCentralDao.findById(id);
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
            throw new RuntimeException("Structure Central avec Code"+ id +"deja existe");
        }

    }

    public void deleteStructureCentralById(Long id){
        if(structureCentralDao.existsById(id)){
            structureCentralDao.deleteById(id);
        }else {
            throw new RuntimeException("Structure Central :" + id + "n existe pas") ;
        }
    }

    public Agence addNewAgence(Long id, Agence agence ){
        Optional<StructureCentral> structureCentralOptional = structureCentralDao.findById(id);
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
            throw new RuntimeException("Structure Central avec code "+ id + "n existe pas ");
        }
    }
    public List<StructureCentral> getStructureCentralByCodeDirection(String codeDirection) {
        return structureCentralDao.findByDirectionRegional_CodeDirection(codeDirection);
    }
    public List<StructureCentral> getStrucutureCentralByName(String libelleDirection){
        return structureCentralDao.findStructureCentralByLibelleStructureIgnoreCase(libelleDirection);
    }




}
