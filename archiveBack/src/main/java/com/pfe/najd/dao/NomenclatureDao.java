package com.pfe.najd.dao;

import com.pfe.najd.entities.Nomenclature;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NomenclatureDao extends JpaRepository<Nomenclature,Long> {
    boolean existsById(Long id);
    List<Nomenclature> findAll();
    List<Nomenclature> findByDesignationNomenclatureContainingIgnoreCase(String designationNomenclature);
}
