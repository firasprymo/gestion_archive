package com.pfe.najd.service.implementation;

import com.pfe.najd.entities.DocumentRequest;
import com.pfe.najd.repository.DocumentRequestRepository;
import com.pfe.najd.service.DocumentRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DocumentRequestServiceImpl implements DocumentRequestService {
    private final DocumentRequestRepository documentRepository;

    //TODO: change the code of create to verify if the codeStartWith "DR"
    public DocumentRequest createDocumentRequest(DocumentRequest document) {
            return documentRepository.save(document);
    }


    public List<DocumentRequest> getAllDocumentRequest() {
        return documentRepository.findAll();
    }

    public Optional<DocumentRequest> getDocumentRequestById(Long numDocumentRequest) {
        return documentRepository.findById(numDocumentRequest);
    }

    public void deleteDocumentRequestById(Long id) {
        if (documentRepository.existsById(id)) {
            documentRepository.deleteById(id);
        } else {
            throw new RuntimeException("Direction Regional with code " + id + " does not exist.");
        }
    }

    public DocumentRequest updateDocumentRequest(Long id, DocumentRequest updatedDocumentRequest) {
        Optional<DocumentRequest> existingDocumentRequestOptional = documentRepository.findById(id);

        if (existingDocumentRequestOptional.isPresent()) {
            DocumentRequest existingDocumentRequest = existingDocumentRequestOptional.get();

            return documentRepository.save(existingDocumentRequest);
        } else {
            throw new RuntimeException("Direction Regional with code " + id + " does not exist.");
        }
    }

    @Override
    public List<DocumentRequest> getDocumentRequestByName(String libelleDirection) {
        return null;
    }


    @Transactional
    public Page<DocumentRequest> pageDocumentRequests(Pageable pageable) {
        Page<DocumentRequest> documents = documentRepository.findAll(pageable);

        return new PageImpl<>(documents.getContent(), documents.getPageable(), documents.getTotalElements());

    }



}
