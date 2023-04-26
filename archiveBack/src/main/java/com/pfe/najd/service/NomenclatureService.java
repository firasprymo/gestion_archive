package com.pfe.najd.service;

import com.pfe.najd.entities.Nomenclature;
import org.springframework.data.domain.*;

import java.util.*;

public interface NomenclatureService {


    Nomenclature createNomenclature(Nomenclature nomenclature);

    List<Nomenclature> getAllNomenclature();
    Optional<Nomenclature> getNomenclatureById(Long id);

    void deleteNomenclatureById(Long id);
    Page<Nomenclature> pageNomenclatures(Pageable pageable);

    Nomenclature updateNomenclatureById(Long id, Nomenclature updatedNomenclature);
    List<Nomenclature> getNomenclatureDesignationNomenclature(String designationNomenclature);
}
