package com.pfe.najd.repository;

import com.pfe.najd.entities.CentrePreArchive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CentrePreArchiveRepository extends JpaRepository<CentrePreArchive,Long> {
    boolean existsByCodeCentrePreArchive(String codeCentrePreArchive);
    List<CentrePreArchive> findAll();
    List<CentrePreArchive> findByCodeCentrePreArchive(String codeCentrePreArchive);
    List<CentrePreArchive> findByLibelleCentrePreArchiveContainingIgnoreCase(String libelleCentrePreArchive);
}
