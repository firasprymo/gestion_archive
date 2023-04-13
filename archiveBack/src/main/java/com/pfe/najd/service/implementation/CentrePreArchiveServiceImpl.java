package com.pfe.najd.service.implementation;

import com.pfe.najd.entities.CentreArchive;
import com.pfe.najd.repository.CentrePreArchiveRepository;
import com.pfe.najd.entities.CentrePreArchive;
import com.pfe.najd.service.CentrePreArchiveService;
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
public class CentrePreArchiveServiceImpl implements CentrePreArchiveService {
    private final CentrePreArchiveRepository centrePreArchiveDao;

    public CentrePreArchive createCentrePreArchive(CentrePreArchive centrePreArchive) {
        if (centrePreArchiveDao.existsByCodeCentrePreArchive(centrePreArchive.getCodeCentrePreArchive())) {
            throw new RuntimeException("centre de pre-Archive avec code = " + centrePreArchive.getCodeCentrePreArchive() + " existe");
        } else {
            return centrePreArchiveDao.save(centrePreArchive);
        }
    }

    @Transactional
    public Page<CentrePreArchive> pageCentrePreArchives(Pageable pageable) {
        Page<CentrePreArchive> centreArchives = centrePreArchiveDao.findAll(pageable);

        return new PageImpl<>(centreArchives.getContent(), centreArchives.getPageable(), centreArchives.getTotalElements());

    }

    public List<CentrePreArchive> getAllCentrePreArchive() {
        return centrePreArchiveDao.findAll();
    }

    public Optional<CentrePreArchive> getCentrePreArchiveById(Long id) {
        return centrePreArchiveDao.findById(id);
    }

    public void deleteCentrePreArchiveId(Long id) {
        if (centrePreArchiveDao.existsById(id)) {
            centrePreArchiveDao.deleteById(id);
        } else {
            throw new RuntimeException("centre Pre-Archive avec code " + id + " n'existe pas");
        }
    }

    public CentrePreArchive updateCentrePreArchive(Long id, CentrePreArchive updatedCentrePreArchive) {
        Optional<CentrePreArchive> existingCentrePreArchiveOptional = centrePreArchiveDao.findById(id);
        if (existingCentrePreArchiveOptional.isPresent()) {
            CentrePreArchive existingCentrePreArchive = existingCentrePreArchiveOptional.get();
            if (updatedCentrePreArchive.getLibelleCentrePreArchive() != null) {
                existingCentrePreArchive.setLibelleCentrePreArchive(updatedCentrePreArchive.getLibelleCentrePreArchive());
            }

            return centrePreArchiveDao.save(existingCentrePreArchive);
        } else {
            throw new RuntimeException("centre Pre Archive avec code " + id + " n'existe pas");
        }
    }

    public List<CentrePreArchive> getCentrePreArchiveByName(String libelleCentrePreArchive) {
        return centrePreArchiveDao.findByLibelleCentrePreArchiveContainingIgnoreCase(libelleCentrePreArchive);
    }
}
