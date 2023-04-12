package com.pfe.najd.controller;

import com.pfe.najd.entities.Document;
import com.pfe.najd.entities.DocumentRequest;
import com.pfe.najd.service.DocumentRequestService;
import com.pfe.najd.service.implementation.DocumentRequestServiceImpl;
import com.pfe.najd.service.implementation.DocumentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController

@RequestMapping("/api/document-requests")
public class DocumentRequestController {
    @Autowired
    private DocumentRequestService documentService;

    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<DocumentRequest> createDocument(@RequestBody DocumentRequest document){
        DocumentRequest createdDocument  = documentService.createDocumentRequest(document);
        return new ResponseEntity<>(createdDocument, HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<List<DocumentRequest>> getAllDocument(){
        List<DocumentRequest> documents = documentService.getAllDocumentRequest();
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }
    @GetMapping("/get-all-documents")
    public ResponseEntity<Page<DocumentRequest>> getAllDocuments(Pageable pageable) {
        return ResponseEntity.ok().body(documentService.pageDocumentRequests(pageable));
    }
    @GetMapping("/get-document/{numDocument}")
    public ResponseEntity<DocumentRequest> getDocumentById(@PathVariable("numDocument") Long id){
        Optional<DocumentRequest> document = documentService.getDocumentRequestById(id);
        return document.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() ->
                new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Delete Document by code
    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN')")
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



    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<String> handleConflict(RuntimeException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
    }


}