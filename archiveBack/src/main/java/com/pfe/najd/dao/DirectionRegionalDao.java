package com.pfe.najd.dao;

import com.pfe.najd.entities.DirectionRegional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DirectionRegionalDao extends JpaRepository<DirectionRegional,Long> {
    boolean existsByCodeDirection(String codeDirection);
    List<DirectionRegional> findAll();
    List<DirectionRegional> findByCodeDirection(String codeDirection);
    List<DirectionRegional> findByLibelleDirectionContainingIgnoreCase(String libelleDirection);


}
