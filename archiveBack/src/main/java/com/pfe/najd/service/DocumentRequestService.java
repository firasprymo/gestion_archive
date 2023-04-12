package com.pfe.najd.service;

import com.pfe.najd.entities.DocumentRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;


public interface DocumentRequestService {
    Page<DocumentRequest> pageDocumentRequests(Pageable pageable);


    public DocumentRequest createDocumentRequest(DocumentRequest document) ;


    public List<DocumentRequest> getAllDocumentRequest() ;

    public Optional<DocumentRequest> getDocumentRequestById(Long id) ;

    public void deleteDocumentRequestById(Long id) ;

    public DocumentRequest updateDocumentRequest(Long id, DocumentRequest updatedDocumentRequest) ;



    public List<DocumentRequest> getDocumentRequestByName(String libelleDirection);
}
