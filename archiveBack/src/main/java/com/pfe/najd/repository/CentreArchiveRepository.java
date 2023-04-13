package com.pfe.najd.repository;

import com.pfe.najd.entities.CentreArchive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface CentreArchiveRepository extends JpaRepository<CentreArchive,Long> {
        boolean existsByCodeCentreArchive(String codeCentreArchive);
        List<CentreArchive> findAll();
        List<CentreArchive> findByCodeCentreArchive(String codeCentreArchive);
        List<CentreArchive> findByLibelleCentreArchiveContainingIgnoreCase(String libelleCentreArchive);
}
