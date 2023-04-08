package com.pfe.najd.service;

import com.pfe.najd.dao.CentrePreArchiveDao;

import com.pfe.najd.entities.CentrePreArchive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CentrePreArchiveService {
    @Autowired
    private CentrePreArchiveDao centrePreArchiveDao;

    public CentrePreArchive createCentrePreArchive(CentrePreArchive centrePreArchive){
        if(centrePreArchiveDao.existsByCodeCentrePreArchive(centrePreArchive.getCodeCentrePreArchive())){
            throw new RuntimeException("centre de pre-Archive avec code = "+centrePreArchive.getCodeCentrePreArchive()+" existe");
        }else {
            return centrePreArchiveDao.save(centrePreArchive);
        }
    }

    public List<CentrePreArchive> getAllCentrePreArchive(){
        return centrePreArchiveDao.findAll();
    }
    public Optional<CentrePreArchive> getCentrePreArchiveById(String codeCentrePreArchive){
        return centrePreArchiveDao.findById(codeCentrePreArchive);
    }
    public void deleteCentrePreArchiveId(String codeCentrePreArchive){
        if(centrePreArchiveDao.existsByCodeCentrePreArchive(codeCentrePreArchive)){
            centrePreArchiveDao.deleteById(codeCentrePreArchive);
        }else {
            throw new RuntimeException("centre Pre-Archive avec code "+ codeCentrePreArchive +" n'existe pas");
        }
    }

    public CentrePreArchive updateCentrePreArchive(String codeCentrePreArchive, CentrePreArchive updatedCentrePreArchive){
        Optional<CentrePreArchive> existingCentrePreArchiveOptional = centrePreArchiveDao.findById(codeCentrePreArchive);
        if(existingCentrePreArchiveOptional.isPresent()){
            CentrePreArchive existingCentrePreArchive = existingCentrePreArchiveOptional.get();
            if(updatedCentrePreArchive.getLibelleCentrePreArchive() != null){
                existingCentrePreArchive.setLibelleCentrePreArchive(updatedCentrePreArchive.getLibelleCentrePreArchive());
            }

            return centrePreArchiveDao.save(existingCentrePreArchive);
        }else {
            throw new RuntimeException("centre Pre Archive avec code "+codeCentrePreArchive+" n'existe pas");
        }
    }

    public List<CentrePreArchive> getCentrePreArchiveByName(String libelleCentrePreArchive){
        return centrePreArchiveDao.findByLibelleCentrePreArchiveContainingIgnoreCase(libelleCentrePreArchive);
    }
}
