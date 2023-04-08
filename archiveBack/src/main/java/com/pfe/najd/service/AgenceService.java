package com.pfe.najd.service;

import com.pfe.najd.dao.AgenceDao;
import com.pfe.najd.entities.Agence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class AgenceService {
    @Autowired
    private AgenceDao agenceDao;
    public boolean existsByCodeAgence(String codeAgence) {
        return agenceDao.existsByCodeAgence(codeAgence);
    }
    public Optional<Agence>getAgenceById(String codeAgence){
        return agenceDao.findById(codeAgence);
    }
    public List<Agence> getAllAgence(){
        return agenceDao.findAll();
    }
    public Agence updateAgence(String codeAgence, Agence updatedAgence){
        Optional<Agence> existingAgenceOptional = agenceDao.findById(codeAgence);
        if(existingAgenceOptional.isPresent()){
            Agence existingAgence = existingAgenceOptional.get();
            if(updatedAgence.getLibelleAgence() != null){
                existingAgence.setLibelleAgence(updatedAgence.getLibelleAgence());
            }
            if(updatedAgence.getLieuArchive() != null){
                existingAgence.setLieuArchive(updatedAgence.getLieuArchive());
            }
            return agenceDao.save(existingAgence);
        }else{
            throw new RuntimeException("Agence avec code "+codeAgence+ "n'existe pas");

        }
    }
    public void deleteAgenceById(String codeAgence){
        if(agenceDao.existsByCodeAgence(codeAgence)){
            agenceDao.deleteById(codeAgence);
        }else{
            throw new RuntimeException("Agence avec code "+codeAgence+ "n'existe pas");
        }
    }

    public List<Agence> getAgenceByCodeStructure(String codeStructure){
        return agenceDao.findByStructureCentral_CodeStructure(codeStructure);
    }

    public List<Agence> getAgenceByName(String libelleAgence){
        return agenceDao.findByLibelleAgenceContainingIgnoreCase(libelleAgence);
    }



}
