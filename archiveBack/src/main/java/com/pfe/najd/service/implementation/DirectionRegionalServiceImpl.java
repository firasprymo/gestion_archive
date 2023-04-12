package com.pfe.najd.service.implementation;

import com.pfe.najd.dao.DirectionRegionalDao;
import com.pfe.najd.entities.DirectionRegional;
import com.pfe.najd.entities.StructureCentral;
import com.pfe.najd.repository.DirectionRegionalRepository;
import com.pfe.najd.service.DirectionRegionalService;
import com.pfe.najd.service.StructureCentralService;
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
public class DirectionRegionalServiceImpl implements DirectionRegionalService {
    private final DirectionRegionalDao directionRegionalDao;
    private final DirectionRegionalRepository directionRegionalRepository;
    private final StructureCentralService structureCentralService;

    //TODO: change the code of create to verify if the codeStartWith "DR"
    public DirectionRegional createDirectionRegional(DirectionRegional directionRegional) {
        if (directionRegionalDao.existsByCodeDirection(directionRegional.getCodeDirection())) {
            throw new RuntimeException("Direction Regional avec le Code" + directionRegional.getCodeDirection() + "deja existe");
        } else {
            return directionRegionalDao.save(directionRegional);
        }
    }


    public List<DirectionRegional> getAllDirectionRegional() {
        return directionRegionalDao.findAll();
    }

    public Optional<DirectionRegional> getDirectionRegionalById(String codeDirection) {
        return directionRegionalDao.findById(codeDirection);
    }

    public void deleteDirectionRegionalById(String codeDirection) {
        if (directionRegionalDao.existsByCodeDirection(codeDirection)) {
            directionRegionalDao.deleteById(codeDirection);
        } else {
            throw new RuntimeException("Direction Regional with code " + codeDirection + " does not exist.");
        }
    }

    public DirectionRegional updateDirectionRegional(String codeDirection, DirectionRegional updatedDirectionRegional) {
        Optional<DirectionRegional> existingDirectionRegionalOptional = directionRegionalDao.findById(codeDirection);

        if (existingDirectionRegionalOptional.isPresent()) {
            DirectionRegional existingDirectionRegional = existingDirectionRegionalOptional.get();

            if (updatedDirectionRegional.getLibelleDirection() != null) {
                existingDirectionRegional.setLibelleDirection(updatedDirectionRegional.getLibelleDirection());
            }
            if (updatedDirectionRegional.getLieuArchive() != null) {
                existingDirectionRegional.setLieuArchive(updatedDirectionRegional.getLieuArchive());
            }
            if (updatedDirectionRegional.getLieuArchiveSecAge() != null) {
                existingDirectionRegional.setLieuArchiveSecAge(updatedDirectionRegional.getLieuArchiveSecAge());
            }

            return directionRegionalDao.save(existingDirectionRegional);
        } else {
            throw new RuntimeException("Direction Regional with code " + codeDirection + " does not exist.");
        }
    }


    public StructureCentral addNewStructureCentral(String directionRegionalCode, StructureCentral structureCentral) {
        Optional<DirectionRegional> directionRegionalOptional = directionRegionalDao.findById(directionRegionalCode);

        if (directionRegionalOptional.isPresent()) {
            DirectionRegional directionRegional = directionRegionalOptional.get();
            if (structureCentralService.existsByCodeStructure(structureCentral.getCodeStructure())) {
                throw new RuntimeException("Structure Central with code " + structureCentral.getCodeStructure() + " already exists.");
            } else {

                structureCentral.setDirectionRegional(directionRegional);
                directionRegional.getStructureCentrals().add(structureCentral);
                directionRegionalDao.save(directionRegional);
                return structureCentral;
            }
        } else {
            throw new RuntimeException("Direction Regional with code " + directionRegionalCode + " does not exist.");
        }
    }

    public List<DirectionRegional> getDirectionRegionalByName(String libelleDirection) {
        return directionRegionalDao.findByLibelleDirectionContainingIgnoreCase(libelleDirection);
    }


    @Transactional
    public Page<DirectionRegional> pageDirectionRegionals(Pageable pageable) {
        Page<DirectionRegional> directionRegionals = directionRegionalRepository.findAll(pageable);

        return new PageImpl<>(directionRegionals.getContent(), directionRegionals.getPageable(), directionRegionals.getTotalElements());

    }



}