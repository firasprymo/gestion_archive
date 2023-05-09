package com.pfe.najd.service;

import com.pfe.najd.entities.CentreArchive;
import com.pfe.najd.repository.CentrePreArchiveRepository;

import com.pfe.najd.entities.CentrePreArchive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface CentrePreArchiveService {

    public CentrePreArchive createCentrePreArchive(CentrePreArchive centrePreArchive);

    public List<CentrePreArchive> getAllCentrePreArchive();

    public Optional<CentrePreArchive> getCentrePreArchiveById(Long id);

    public void deleteCentrePreArchiveId(Long id);

    Page<CentrePreArchive> pageCentrePreArchives(Pageable pageable);

    public CentrePreArchive updateCentrePreArchive(Long id, CentrePreArchive updatedCentrePreArchive);

    public List<CentrePreArchive> getCentrePreArchiveByName(String libelleCentrePreArchive);


}
