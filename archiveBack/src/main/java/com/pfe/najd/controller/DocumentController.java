package com.pfe.najd.controller;

import com.pfe.najd.entities.Document;
import com.pfe.najd.entities.DocumentRequest;
import com.pfe.najd.entities.StructureCentral;
import com.pfe.najd.service.DocumentRequestService;
import com.pfe.najd.service.DocumentService;
import com.pfe.najd.service.implementation.DocumentServiceImpl;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentService documentService;

    private final DocumentRequestService documentRequestService;

//    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<Document> createDocument(@RequestBody Document document){
        Document createdDocument  = documentService.createDocument(document);
        return new ResponseEntity<>(createdDocument, HttpStatus.CREATED);
    }

    @GetMapping("/")
    public ResponseEntity<List<Document>> getAllDocument(){
        List<Document> documents = documentService.getAllDocument();
        return new ResponseEntity<>(documents, HttpStatus.OK);
    }
    @GetMapping("/get-all-documents")
    public ResponseEntity<Page<Document>> getAllDocuments(Pageable pageable) {
        return ResponseEntity.ok().body(documentService.pageDocuments(pageable));
    }
    @GetMapping("/get-document/{numDocument}")
    public ResponseEntity<Document> getDocumentById(@PathVariable("numDocument") Long id){
        Optional<Document> document = documentService.getDocumentById(id);
        return document.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Delete Document by code
    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDocumentById(@PathVariable("id") Long id) {
        try {
            documentService.deleteDocumentById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update Document by code
    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN')")
    @PutMapping("/update/{codeDocument}")
    public ResponseEntity<Document> updateDocument(@PathVariable("codeDocument") Long id, @RequestBody Document updatedDocument) {
        try {
            Document updated = documentService.updateDocument(id, updatedDocument);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


//    @GetMapping("/search-by-name/{numDocument}")
//    public ResponseEntity<List<Document>> getDocumentByName(@PathVariable("numDocument")
//                                                                String numDocument) {
//        List<Document> documents = documentService.getDocumentByName(numDocument);
//        return new ResponseEntity<>(documents, HttpStatus.OK);
//    }
    // update document Status : 

    


    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<String> handleConflict(RuntimeException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
    }


}
