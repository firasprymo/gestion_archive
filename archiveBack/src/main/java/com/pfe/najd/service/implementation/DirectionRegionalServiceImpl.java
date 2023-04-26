package com.pfe.najd.service.implementation;

import com.pfe.najd.dao.DirectionRegionalDao;
import com.pfe.najd.entities.DirectionRegional;
import com.pfe.najd.entities.StructureCentral;
import com.pfe.najd.repository.DirectionRegionalRepository;
import com.pfe.najd.service.DirectionRegionalService;
import lombok.RequiredArgsConstructor;
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
    private final StructureCentralServiceImpl structureCentralService;

    //TODO: change the code of create to verify if the codeStartWith "DR"
    public DirectionRegional createDirectionRegional(DirectionRegional directionRegional) {
        directionRegional.setCodeDirection("DR" + directionRegional.getCodeDirection());

        return directionRegionalDao.save(directionRegional);
    }


    public List<DirectionRegional> getAllDirectionRegional() {
        return directionRegionalDao.findAll();
    }

    public Optional<DirectionRegional> getDirectionRegionalById(Long id) {
        return directionRegionalDao.findById(id);
    }

    public void deleteDirectionRegionalById(Long id) {
        if (directionRegionalDao.existsById(id)) {
            directionRegionalDao.deleteById(id);
        } else {
            throw new RuntimeException("Direction Regional with code " + id + " does not exist.");
        }
    }

    public DirectionRegional updateDirectionRegional(Long id, DirectionRegional updatedDirectionRegional) {
        Optional<DirectionRegional> existingDirectionRegionalOptional = directionRegionalDao.findById(id);

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
            throw new RuntimeException("Direction Regional with code " + id + " does not exist.");
        }
    }


    public StructureCentral addNewStructureCentral(Long id,
                                                   StructureCentral structureCentral) {
        Optional<DirectionRegional> directionRegionalOptional =
                directionRegionalDao.findById(id);

        if (directionRegionalOptional.isPresent()) {
            DirectionRegional directionRegional = directionRegionalOptional.get();
            if (structureCentralService.existsByCodeStructure(structureCentral.getId())) {
                throw new RuntimeException("Structure Central with code " + structureCentral.getCodeStructure()
                        + " already exists.");
            } else {

//                structureCentral.setDirectionRegional(directionRegional);
//                directionRegional.getStructureCentrals().add(structureCentral);
                directionRegionalDao.save(directionRegional);
                return structureCentral;
            }
        } else {
            throw new RuntimeException("Direction Regional with code " + directionRegionalOptional + " does not exist.");
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
