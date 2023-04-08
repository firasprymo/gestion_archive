package com.pfe.najd.service;

import com.pfe.najd.dao.CentreArchiveDao;
import com.pfe.najd.entities.CentreArchive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CentreArchiveService {
    @Autowired
    private CentreArchiveDao centreArchiveDao;

    public CentreArchive createCentreArchive(CentreArchive centreArchive){
        if(centreArchive.getCodeCentreArchive().matches("[0-9]+")) {
            centreArchive.setCodeCentreArchive("CA" + centreArchive.getCodeCentreArchive());
            if (centreArchiveDao.existsByCodeCentreArchive(centreArchive.getCodeCentreArchive())) {
                throw new RuntimeException("centre de -Archive avec code = " + centreArchive.getCodeCentreArchive() + " existe");
            } else {
                return centreArchiveDao.save(centreArchive);
            }
        }else{
            throw new RuntimeException("le code de centre doit commencer par CA " + centreArchive.getCodeCentreArchive() + " existe");
        }
    }

    public List<CentreArchive> getAllCentreArchive(){
        return centreArchiveDao.findAll();
    }
    public Optional<CentreArchive> getCentreArchiveById(String codeCentreArchive){
        return centreArchiveDao.findById(codeCentreArchive);
    }
    public void deleteCentreArchiveId(String codeCentreArchive){
        if(centreArchiveDao.existsByCodeCentreArchive(codeCentreArchive)){
            centreArchiveDao.deleteById(codeCentreArchive);
        }else {
            throw new RuntimeException("centre -Archive avec code "+ codeCentreArchive +" n'existe pas");
        }
    }

    public CentreArchive updateCentreArchive(String codeCentreArchive, CentreArchive updatedCentreArchive){
        Optional<CentreArchive> existingCentreArchiveOptional = centreArchiveDao.findById(codeCentreArchive);
        if(existingCentreArchiveOptional.isPresent()){
            CentreArchive existingCentreArchive = existingCentreArchiveOptional.get();
            if(updatedCentreArchive.getLibelleCentreArchive() != null){
                existingCentreArchive.setLibelleCentreArchive(updatedCentreArchive.getLibelleCentreArchive());
            }

            return centreArchiveDao.save(existingCentreArchive);
        }else {
            throw new RuntimeException("centre  Archive avec code "+codeCentreArchive+" n'existe pas");
        }
    }

    public List<CentreArchive> getCentreArchiveByName(String libelleCentreArchive){
        return centreArchiveDao.findByLibelleCentreArchiveContainingIgnoreCase(libelleCentreArchive);
    }
}
