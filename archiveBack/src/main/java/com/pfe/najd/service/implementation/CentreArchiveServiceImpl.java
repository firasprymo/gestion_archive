package com.pfe.najd.service.implementation;

import com.pfe.najd.repository.CentreArchiveRepository;
import com.pfe.najd.entities.CentreArchive;
import com.pfe.najd.service.CentreArchiveService;
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
public class CentreArchiveServiceImpl implements CentreArchiveService {
private  final CentreArchiveRepository centreArchiveRepository;
    public CentreArchive createCentreArchive(CentreArchive centreArchive) {
        centreArchive.setCodeCentreArchive("CA" + centreArchive.getCodeCentreArchive());
        if (centreArchiveRepository.existsByCodeCentreArchive(centreArchive.getCodeCentreArchive())) {
            throw new RuntimeException("centre de -Archive avec code = " + centreArchive.getCodeCentreArchive() + " existe");
        } else {
            return centreArchiveRepository.save(centreArchive);
        }

    }

    public List<CentreArchive> getAllCentreArchive() {
        return centreArchiveRepository.findAll();
    }

    public Optional<CentreArchive> getCentreArchiveById(Long id) {
        return centreArchiveRepository.findById(id);
    }

    public void deleteCentreArchiveId(Long id) {
        if (centreArchiveRepository.existsById(id)) {
            centreArchiveRepository.deleteById(id);
        } else {
            throw new RuntimeException("centre -Archive avec code " + id + " n'existe pas");
        }
    }

    public CentreArchive updateCentreArchive(Long id, CentreArchive updatedCentreArchive) {
        Optional<CentreArchive> existingCentreArchiveOptional = centreArchiveRepository.findById(id);
        if (existingCentreArchiveOptional.isPresent()) {
            CentreArchive existingCentreArchive = existingCentreArchiveOptional.get();
            if (updatedCentreArchive.getLibelleCentreArchive() != null) {
                existingCentreArchive.setLibelleCentreArchive(updatedCentreArchive.getLibelleCentreArchive());
            }

            return centreArchiveRepository.save(existingCentreArchive);
        } else {
            throw new RuntimeException("centre  Archive avec code " + id + " n'existe pas");
        }
    }
    @Transactional
    public Page<CentreArchive> pageCentreArchives(Pageable pageable) {
        Page<CentreArchive> centreArchives = centreArchiveRepository.findAll(pageable);

        return new PageImpl<>(centreArchives.getContent(), centreArchives.getPageable(), centreArchives.getTotalElements());

    }
    public List<CentreArchive> getCentreArchiveByName(String libelleCentreArchive) {
        return centreArchiveRepository.findByLibelleCentreArchiveContainingIgnoreCase(libelleCentreArchive);
    }
}
