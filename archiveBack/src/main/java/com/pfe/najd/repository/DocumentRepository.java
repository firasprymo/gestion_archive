package com.pfe.najd.repository;

import com.pfe.najd.entities.DirectionRegional;
import com.pfe.najd.entities.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long>,
        JpaSpecificationExecutor<Document> {

    boolean existsById(Long id);

}
