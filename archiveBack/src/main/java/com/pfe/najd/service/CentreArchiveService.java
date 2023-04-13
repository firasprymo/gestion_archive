package com.pfe.najd.service;

import com.pfe.najd.entities.CentreArchive;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface CentreArchiveService {

    CentreArchive createCentreArchive(CentreArchive centreArchive);
    Page<CentreArchive> pageCentreArchives(Pageable pageable);

    List<CentreArchive> getAllCentreArchive();

    Optional<CentreArchive> getCentreArchiveById(Long id);

    void deleteCentreArchiveId(Long id);

    CentreArchive updateCentreArchive(Long id, CentreArchive updatedCentreArchive);

    List<CentreArchive> getCentreArchiveByName(String libelleCentreArchive);
}
