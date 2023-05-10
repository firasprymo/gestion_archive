package com.pfe.najd.repository;

import com.pfe.najd.Enum.DocumentStatus;
import com.pfe.najd.entities.Document;
import com.pfe.najd.entities.DocumentRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRequestRepository extends JpaRepository<DocumentRequest, Long>,
        JpaSpecificationExecutor<DocumentRequest> {

    boolean existsById(Long id);

    @Query("select dr  from DocumentRequest dr where dr.document.Status='PENDING_VERSEMENT' and dr.document.codeLieuArchive=?1 ")
    Page<DocumentRequest> findAllByDocumentStatusAndLieuAffectationOrderById(String lieuAffectation, Pageable pageable);

    @Query("select distinct dr  from DocumentRequest dr where dr.document.Status NOT IN ('SECOND_AGE','PRIME_AGE','DESTRUCTED','THIRD_AGE') and" +
            " dr.document.codeLieuArchive=?1 ")
    Page<DocumentRequest> findAllByDocumentStatusAndLieuAffectationOrderByDocument(String lieuAffectation, Pageable pageable);

    @Query("select dr  from DocumentRequest dr where dr.document.Status='PENDING' and dr.document.codeLieuArchive=?1 ")
    Page<DocumentRequest> findAllByDocumentStatusAndLieuAffectation(String lieuAffectation, Pageable pageable);

    @Query("select dr  from DocumentRequest dr where dr.status='PENDING' and dr.document.codeLieuArchive=?1 ")
    Page<DocumentRequest> findAllByStatusAndLieuAffectation(String lieuAffectation, Pageable pageable);
    @Query("select dr  from DocumentRequest dr where dr.document.Status='SECOND_AGE' and dr.document.codeLieuArchive=?1 ")
    Page<DocumentRequest> getAllDeuxiemeAge(String lieuAffectation, Pageable pageable);
    @Query("select dr  from DocumentRequest dr where dr.document.Status='MATURITY_SECOND_AGE' and dr.document.codeLieuArchive=?1 ")
    Page<DocumentRequest> getAllTroisiemeAge(String lieuAffectation, Pageable pageable);
}
