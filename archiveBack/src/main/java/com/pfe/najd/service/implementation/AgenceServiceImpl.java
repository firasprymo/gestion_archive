package com.pfe.najd.service.implementation;

import com.pfe.najd.dao.AgenceDao;
import com.pfe.najd.dao.StructureCentralDao;
import com.pfe.najd.entities.Agence;
import com.pfe.najd.entities.StructureCentral;
import com.pfe.najd.service.AgenceService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AgenceServiceImpl implements AgenceService {
    private final AgenceDao agenceDao;
    private final StructureCentralDao structureCentralDao;

    public boolean existsByCodeAgence(String codeAgence) {
        return agenceDao.existsByCodeAgence(codeAgence);
    }

    @Transactional
    public Agence createAgence(Agence agence) {
        agence.setCodeAgence("AG" + agence.getCodeAgence());
        StructureCentral structureCentral = structureCentralDao.findById(agence.getStructure().getId())
                .orElseThrow(() -> new RuntimeException("Structure doesnt exisr"));
        agence.setStructure(structureCentral);
        return agenceDao.save(agence);
    }

    public Optional<Agence> getAgenceById(Long id) {
        return agenceDao.findById(id);
    }

    public List<Agence> getAllAgence() {
        return agenceDao.findAll();
    }

    public Agence updateAgence(Long id, Agence updatedAgence) {
        Optional<Agence> existingAgenceOptional = agenceDao.findById(id);
        if (existingAgenceOptional.isPresent()) {
            Agence existingAgence = existingAgenceOptional.get();
            if (updatedAgence.getLibelleAgence() != null) {
                existingAgence.setLibelleAgence(updatedAgence.getLibelleAgence());
            }
            if (updatedAgence.getLieuArchive() != null) {
                existingAgence.setLieuArchive(updatedAgence.getLieuArchive());
            }
            if (updatedAgence.getLieuArchiveSecAge() != null) {
                existingAgence.setLieuArchiveSecAge(updatedAgence.getLieuArchiveSecAge());
            }
            return agenceDao.save(existingAgence);
        } else {
            throw new RuntimeException("Agence avec code " + id + "n'existe pas");

        }
    }

    public void deleteAgenceById(Long id) {
        if (agenceDao.existsById(id)) {
            agenceDao.deleteById(id);
        } else {
            throw new RuntimeException("Agence avec code " + id + "n'existe pas");
        }
    }

    public List<Agence> getAgenceByCodeStructure(String codeStructure) {
//                agenceDao.findByStructureCentral_CodeStructure(codeStructure);
        return null;
    }

    public List<Agence> getAgenceByName(String libelleAgence) {
        return agenceDao.findByLibelleAgenceContainingIgnoreCase(libelleAgence);
    }

    @Transactional
    public Page<Agence> pageAgences(Pageable pageable) {
        Page<Agence> documents = agenceDao.findAll(pageable);

        return new PageImpl<>(documents.getContent(), documents.getPageable(), documents.getTotalElements());

    }

}
