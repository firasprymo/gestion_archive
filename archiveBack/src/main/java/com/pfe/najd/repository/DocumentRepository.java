package com.pfe.najd.repository;

import com.pfe.najd.Enum.DocumentStatus;
import com.pfe.najd.entities.DirectionRegional;
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
public interface DocumentRepository extends JpaRepository<Document, Long>,
        JpaSpecificationExecutor<Document> {

    boolean existsById(Long id);

    List<DocumentRequest> existsSById(Long id);


    @Query("select dr  from Document dr where  dr.codeLieuArchive=?1 and dr.Status=?2")
    List<Document> getAllByDocumentLieuAffectation(String lieuAffectation, DocumentStatus status, Pageable pageable);

    @Query("select dr  from Document dr where  dr.Status  IN ('SECOND_AGE','MATURITY_SECOND_AGE','THIRD_AGE')")
    Page<Document> getAllByDocumentLieuAffectationAndStatus(Pageable pageable);


}
