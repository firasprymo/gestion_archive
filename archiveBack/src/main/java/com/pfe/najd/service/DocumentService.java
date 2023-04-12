package com.pfe.najd.service;

import com.pfe.najd.entities.DirectionRegional;
import com.pfe.najd.entities.Document;
import com.pfe.najd.entities.StructureCentral;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;


public interface DocumentService {
    Page<Document> pageDocuments(Pageable pageable);


    Document createDocument(Document document) ;


    List<Document> getAllDocument() ;

    Optional<Document> getDocumentById(Long id) ;

    void deleteDocumentById(Long id) ;

    Document updateDocument(Long id, Document updatedDocument) ;





}
