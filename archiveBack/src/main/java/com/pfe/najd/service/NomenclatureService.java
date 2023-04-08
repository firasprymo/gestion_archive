package com.pfe.najd.service;

import com.pfe.najd.dao.NomenclatureDao;
import com.pfe.najd.entities.Nomenclature;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NomenclatureService {

    @Autowired
    private NomenclatureDao nomenclatureDao;

    public Nomenclature createNomenclature(Nomenclature nomenclature){
        if(nomenclatureDao.existsByCodeNomenclature(nomenclature.getCodeNomenclature())){
            throw new RuntimeException("nomenclature avec code"+  nomenclature.getCodeNomenclature() + "deja existe");
        }else{
            return nomenclatureDao.save(nomenclature);
        }
    }

    public List<Nomenclature> getAllNomenclature(){
        return nomenclatureDao.findAll();
    }
    public Optional<Nomenclature> getNomenclatureById(String codeNomenclature){
        return nomenclatureDao.findById( codeNomenclature);
    }

    public void deleteNomenclatureById(String codeNomenclature){
        if (nomenclatureDao.existsByCodeNomenclature(codeNomenclature)){
            nomenclatureDao.deleteById(codeNomenclature);
        }else{
            throw new RuntimeException("nomenclature avec code"+codeNomenclature+"n'existe pas");
        }
    }

    public Nomenclature updateNomenclatureById(String codeNomenclature, Nomenclature updatedNomenclature){
        Optional<Nomenclature> existingNomenclatureOptional = nomenclatureDao.findById(codeNomenclature);
        if(existingNomenclatureOptional.isPresent()){
            Nomenclature existingNomenclature = existingNomenclatureOptional.get();
            if (updatedNomenclature.getDesignationNomenclature() != null){
                existingNomenclature.setDesignationNomenclature(updatedNomenclature.getDesignationNomenclature());
            }
            if (updatedNomenclature.getDureeConservationPremAge() != null){
                existingNomenclature.setDureeConservationPremAge(updatedNomenclature.getDureeConservationPremAge());
            }
            if (updatedNomenclature.getDureeConservationSecAge() != null){
                existingNomenclature.setDureeConservationSecAge(updatedNomenclature.getDureeConservationSecAge());
            }
            if (updatedNomenclature.getValeurHistoriqueTroiAge() != null){
                existingNomenclature.setValeurHistoriqueTroiAge(updatedNomenclature.getValeurHistoriqueTroiAge());
            }
            return nomenclatureDao.save(existingNomenclature);
        }else {
            throw new RuntimeException("nomenclature with code" + codeNomenclature + "does not exist" );
        }
    }
    public List<Nomenclature> getNomenclatureDesignationNomenclature(String designationNomenclature){
        return nomenclatureDao.findByDesignationNomenclatureContainingIgnoreCase(designationNomenclature);
    }

}
