package com.pfe.najd.service;

import com.pfe.najd.Enum.RequestStatus;
import com.pfe.najd.controller.RequestStatusDTO;
import com.pfe.najd.entities.CentrePreArchive;
import com.pfe.najd.entities.Document;
import com.pfe.najd.entities.DocumentRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;


public interface DocumentRequestService {
    Page<DocumentRequest> pageDocumentRequests(Pageable pageable);

    Page<DocumentRequest> getAllPendingDocuments(Pageable pageable);

    DocumentRequest createDocumentRequest(DocumentRequest document);


    List<DocumentRequest> getAllDocumentRequest();

    Optional<DocumentRequest> getDocumentRequestById(Long id);

    void deleteDocumentRequestById(Long id);

    DocumentRequest updateDocumentRequest(Long id, DocumentRequest updatedDocumentRequest);


    List<DocumentRequest> getDocumentRequestByName(String libelleDirection);

    DocumentRequest changeStatus(Long id, String status);
    DocumentRequest changeRequestStatus(Long id, RequestStatusDTO status);

    DocumentRequest requestDocument(Document document);

    Page<DocumentRequest> getAllRequestConsultDocuments(Pageable pageable);
    Page<DocumentRequest> getAllDocumentsDeuxieme(Pageable pageable);
    Page<DocumentRequest> getAllDocumentsTroisieme(Pageable pageable);
    Page<DocumentRequest>getAllDocumentVersementRequest(Pageable pageable);
    Page<DocumentRequest>getAllDocumentPrimeAge(Pageable pageable);
    void createDemandeVersement(List<Document> documents);

}
