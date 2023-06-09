package com.pfe.najd.service;

import com.pfe.najd.entities.Agence;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface AgenceService {
    boolean existsByCodeAgence(String codeAgence);

    Agence createAgence(Agence agence);

    Optional<Agence> getAgenceById(Long id);

    List<Agence> getAllAgence();

    Agence updateAgence(Long id, Agence updatedAgence);

    void deleteAgenceById(Long id);

    List<Agence> getAgenceByCodeStructure(String codeStructure);

    List<Agence> getAgenceByName(String libelleAgence);

     Page<Agence> pageAgences(Pageable pageable) ;

}
