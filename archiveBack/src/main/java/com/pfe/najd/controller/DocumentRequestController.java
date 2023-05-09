package com.pfe.najd.controller;

import com.pfe.najd.Enum.RequestStatus;
import com.pfe.najd.dto.DocumentVersementDTO;
import com.pfe.najd.entities.CentrePreArchive;
import com.pfe.najd.entities.Document;
import com.pfe.najd.entities.DocumentRequest;
import com.pfe.najd.service.DocumentRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/document-requests")
public class DocumentRequestController {
    @Autowired
    private DocumentRequestService documentService;

    //    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<DocumentRequest> createDocument(@RequestBody DocumentRequest document) {
        DocumentRequest createdDocument = documentService.createDocumentRequest(document);
        return new ResponseEntity<>(createdDocument, HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<List<DocumentRequest>> getAllDocument() {
        List<DocumentRequest> documents = documentService.getAllDocumentRequest();
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    @GetMapping("/get-all-documents")
    public ResponseEntity<Page<DocumentRequest>> getAllDocuments(Pageable pageable) {
        return ResponseEntity.ok().body(documentService.pageDocumentRequests(pageable));
    }

    @GetMapping("/get-all-prime-age-documents")
    public ResponseEntity<Page<DocumentRequest>> getAllMatutiryPrimeAgeDocuments(Pageable pageable) {
        return ResponseEntity.ok().body(documentService.getAllDocumentPrimeAge(pageable));
    }

    @GetMapping("/get-all-demandes-versement")
    public ResponseEntity<Page<DocumentRequest>> getAllDemandeVersement(Pageable pageable) {
        return ResponseEntity.ok().body(documentService.getAllDocumentVersementRequest(pageable));
    }

    @PostMapping("/request-consult")
    public ResponseEntity<DocumentRequest> requestDocument(@RequestBody Document document) {
        try {
            DocumentRequest updated = documentService.requestDocument(document);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/get-document/{numDocument}")
    public ResponseEntity<DocumentRequest> getDocumentById(@PathVariable("numDocument") Long id) {
        Optional<DocumentRequest> document = documentService.getDocumentRequestById(id);
        return document.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() ->
                new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping("/get-all-request-documents")
    public ResponseEntity<Page<DocumentRequest>> getAllPendingDocuments(Pageable pageable) {
        return ResponseEntity.ok().body(documentService.getAllPendingDocuments(pageable));
    }


    @GetMapping("/get-all-request-consult-documents")
    public ResponseEntity<Page<DocumentRequest>> getAllRequestConsultDocuments(Pageable pageable) {
        return ResponseEntity.ok().body(documentService.getAllRequestConsultDocuments(pageable));
    }

    // Delete Document by code
    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_RESOPONSABLE')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocumentById(@PathVariable("id") Long id) {
        try {
            documentService.deleteDocumentRequestById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update Document by code
    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN')")
    @PutMapping("/update/{codeDocument}")
    public ResponseEntity<DocumentRequest> updateDocument(@PathVariable("codeDocument") Long id,
                                                          @RequestBody DocumentRequest updatedDocument) {
        try {
            DocumentRequest updated = documentService.updateDocumentRequest(id, updatedDocument);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/search-by-name/{numDocument}")
    public ResponseEntity<List<DocumentRequest>> getDocumentByName(@PathVariable("numDocument")
                                                                   String numDocument) {
        List<DocumentRequest> documents = documentService.getDocumentRequestByName(numDocument);
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }

    @PutMapping("/change-status/{id}")
    public DocumentRequest updateDocumentRequestStatus(@PathVariable Long id, @RequestBody String status) {
        return documentService.changeStatus(id, status);
    }

    @PutMapping("/change-request-status/{id}")
    public DocumentRequest changeDocumentRequestStatus(@PathVariable Long id, @RequestBody RequestStatusDTO status) {
        return documentService.changeRequestStatus(id, status);
    }

    @PostMapping("/demande-versement")
    public ResponseEntity<Void> createDemandeVersement(@RequestBody Map<String,List<Document>> document) {
        documentService.createDemandeVersement(document.get("document"));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<String> handleConflict(RuntimeException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
    }


}
