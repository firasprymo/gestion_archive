package com.pfe.najd.repository;

import com.pfe.najd.entities.Document;
import com.pfe.najd.entities.DocumentRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRequestRepository extends JpaRepository<DocumentRequest, Long>,
        JpaSpecificationExecutor<DocumentRequest> {

    boolean existsById(Long id);

}
