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
import java.util.Set;

@Repository
public interface DocumentRequestRepository extends JpaRepository<DocumentRequest, Long>,
        JpaSpecificationExecutor<DocumentRequest> {

    boolean existsById(Long id);

    @Query("select distinct dr  from DocumentRequest dr where dr.document.Status='PENDING_VERSEMENT' and dr.document.codeLieuArchive=?1 ")
    Set<DocumentRequest>  findAllByDocumentStatusAndLieuAffectationOrderById(String lieuAffectation);

    @Query("select  dr from DocumentRequest dr where dr.document.Status NOT IN ('PENDING', 'SECOND_AGE','PRIME_AGE','DESTRUCTED','THIRD_AGE') and" +
            " dr.document.codeLieuArchive=?1 ")
    Set<DocumentRequest> findAllByDocumentStatusAndLieuAffectationOrderByDocument(String lieuAffectation);

    @Query("select distinct dr  from DocumentRequest dr where dr.document.Status='PENDING' and dr.document.codeLieuArchive=?1 ")
    Set<DocumentRequest> findAllByDocumentStatusAndLieuAffectation(String lieuAffectation);

    @Query("select distinct dr  from DocumentRequest dr where dr.status='PENDING' and dr.document.codeLieuArchive=?1 ")
    Set<DocumentRequest> findAllByStatusAndLieuAffectation(String lieuAffectation);
    @Query("select distinct dr  from DocumentRequest dr where dr.document.Status='PENDING_VERSEMENT' and dr.document.codeLieuArchive=?1 ")
    Set<DocumentRequest> getAllDeuxiemeAge(String lieuAffectation);
    @Query("select distinct dr  from DocumentRequest dr where dr.document.Status='MATURITY_SECOND_AGE' and dr.document.codeLieuArchive=?1 ")
    Set<DocumentRequest> getAllTroisiemeAge(String lieuAffectation);
}
