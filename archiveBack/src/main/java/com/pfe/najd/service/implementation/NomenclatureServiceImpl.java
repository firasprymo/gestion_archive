package com.pfe.najd.service.implementation;

import com.pfe.najd.dao.NomenclatureDao;
import com.pfe.najd.entities.Document;
import com.pfe.najd.entities.Nomenclature;
import com.pfe.najd.service.NomenclatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class NomenclatureServiceImpl implements NomenclatureService {

    @Autowired
    private NomenclatureDao nomenclatureDao;

    public Nomenclature createNomenclature(Nomenclature nomenclature){
            return nomenclatureDao.save(nomenclature);
    }

    public List<Nomenclature> getAllNomenclature(){
        return nomenclatureDao.findAll();
    }
    public Optional<Nomenclature> getNomenclatureById(Long id){
        return nomenclatureDao.findById(id);
    }

    public void deleteNomenclatureById(Long id){
        if (nomenclatureDao.findById(id).isPresent()){
            nomenclatureDao.deleteById(id);
        }else{
            throw new RuntimeException("nomenclature avec code"+id+"n'existe pas");
        }
    }

    public Nomenclature updateNomenclatureById(Long id, Nomenclature updatedNomenclature){
        Optional<Nomenclature> existingNomenclatureOptional = nomenclatureDao.findById(id);
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
            throw new RuntimeException("nomenclature with code" + id + "does not exist" );
        }
    }
    public List<Nomenclature> getNomenclatureDesignationNomenclature(String designationNomenclature){
        return nomenclatureDao.findByDesignationNomenclatureContainingIgnoreCase(designationNomenclature);
    }
    @Transactional
    public Page<Nomenclature> pageNomenclatures(Pageable pageable) {
        Page<Nomenclature> nomenclature = nomenclatureDao.findAll(pageable);

        return new PageImpl<>(nomenclature.getContent(), nomenclature.getPageable(),nomenclature.getTotalElements());

    }
}
