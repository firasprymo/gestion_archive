package com.pfe.najd.service.implementation;

import com.pfe.najd.Enum.DocumentStatus;
import com.pfe.najd.Enum.RequestStatus;
import com.pfe.najd.controller.RequestStatusDTO;
import com.pfe.najd.entities.Document;
import com.pfe.najd.entities.DocumentRequest;
import com.pfe.najd.entities.User;
import com.pfe.najd.repository.DocumentRepository;
import com.pfe.najd.repository.DocumentRequestRepository;
import com.pfe.najd.repository.UserRepository;
import com.pfe.najd.service.DocumentRequestService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DocumentRequestServiceImpl implements DocumentRequestService {
    private final DocumentRequestRepository documentReqRepository;
    private final DocumentRepository documentRepository;
    private final UserRepository userRepository;

    //TODO: change the code of create to verify if the codeStartWith "DR"
    public DocumentRequest createDocumentRequest(DocumentRequest document) {
        return documentReqRepository.save(document);
    }


    public List<DocumentRequest> getAllDocumentRequest() {
        List<DocumentRequest> documents = documentReqRepository.findAll();


        return documentReqRepository.findAll();
    }

    public Optional<DocumentRequest> getDocumentRequestById(Long numDocumentRequest) {
        return documentReqRepository.findById(numDocumentRequest);
    }

    public void deleteDocumentRequestById(Long id) {
        if (documentReqRepository.existsById(id)) {
            documentReqRepository.deleteById(id);
        } else {
            throw new RuntimeException("Direction Regional with code " + id + " does not exist.");
        }
    }

    public DocumentRequest updateDocumentRequest(Long id, DocumentRequest updatedDocumentRequest) {
        Optional<DocumentRequest> existingDocumentRequestOptional = documentReqRepository.findById(id);

        if (existingDocumentRequestOptional.isPresent()) {
            DocumentRequest existingDocumentRequest = existingDocumentRequestOptional.get();

            return documentReqRepository.save(existingDocumentRequest);
        } else {
            throw new RuntimeException("Direction Regional with code " + id + " does not exist.");
        }
    }

    @Override
    public List<DocumentRequest> getDocumentRequestByName(String libelleDirection) {
        return null;
    }

    @Override
    public DocumentRequest changeStatus(Long id, String status) {
        DocumentRequest documentRequest = documentReqRepository.findById(id).
                orElseThrow(() ->
                        new RuntimeException("Document doesn't exist"));
        if (DocumentStatus.valueOf(status) == DocumentStatus.PENDING) {
            documentRequest.getDocument().setStatus(DocumentStatus.PRIME_AGE);
        }
        return documentReqRepository.save(documentRequest);
    }
    @Override
    public DocumentRequest changeRequestStatus(Long id, RequestStatusDTO requestStatusDTO) {
        DocumentRequest documentRequest = documentReqRepository.findById(id).
                orElseThrow(() ->
                        new RuntimeException("Document doesn't exist"));
            documentRequest.setStatus(requestStatusDTO.getStatus());
        return documentReqRepository.save(documentRequest);
    }


    @Transactional
    public Page<DocumentRequest> pageDocumentRequests(Pageable pageable) {
        Page<DocumentRequest> documents = documentReqRepository.findAll(pageable);
        for (DocumentRequest item :
                documents) {
            if (!item.getDocument().getStatus().equals(DocumentStatus.PENDING)) {

                if (LocalDate.now().isBefore(item.getDocument().getMaturitePremAge())) {
                    item.getDocument().setStatus(DocumentStatus.MATURITY_PRIME_AGE);
                    documentReqRepository.save(item);
                } else if (LocalDate.now().isBefore(item.getDocument().getMaturiteSecAge())) {
                    item.getDocument().setStatus(DocumentStatus.MATURITY_SECOND_AGE);
                    documentReqRepository.save(item);
                }
//            else if (LocalDate.now().isAfter(item.getDocument().getMaturiteSecAge())
//                    && item.getDocument().getNomenclature().getValeurHistoriqueTroiAge()) {
//                item.getDocument().setStatus(DocumentStatus.THIRD_AGE);
//                documentRepository.save(item);
                //    }
//        else if (LocalDate.now().isAfter(item.getDocument().getMaturiteSecAge())
//                    && !item.getDocument().getNomenclature().getValeurHistoriqueTroiAge()) {
//                item.getDocument().setStatus(DocumentStatus.DESTRUCTED);
//                documentRepository.save(item);
//            }
            }
        }
        return new PageImpl<>(documents.getContent(), documents.getPageable(), documents.getTotalElements());

    }

    @Transactional
    public Page<DocumentRequest> getAllPendingDocuments(Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User user = userRepository.findByUsername(currentPrincipalName).get();
        Page<DocumentRequest> documents = documentReqRepository.findAllByDocumentStatusAndLieuAffectation(user.getLieuAffectation(), pageable);

        return new PageImpl<>(documents.getContent(), documents.getPageable(), documents.getTotalElements());

    }
    @Transactional
    public Page<DocumentRequest> getAllRequestConsultDocuments(Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User user = userRepository.findByUsername(currentPrincipalName).get();
        Page<DocumentRequest> documents = documentReqRepository.findAllByStatusAndLieuAffectation(user.getLieuAffectation(), pageable);

        return new PageImpl<>(documents.getContent(), documents.getPageable(), documents.getTotalElements());

    }
    public Page<DocumentRequest>getAllDocumentPrimeAge(Pageable pageable){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User user = userRepository.findByUsername(currentPrincipalName).get();
        Page<DocumentRequest> documents = documentReqRepository.findAllByDocumentStatusAndLieuAffectationOrderByDocument(user.getLieuAffectation(),pageable);
        return new PageImpl<>(documents.getContent(), documents.getPageable(), documents.getTotalElements());
    }


    public DocumentRequest requestDocument(Document document) {
        DocumentRequest documentRequest = new DocumentRequest();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User user = userRepository.findByUsername(currentPrincipalName).get();
        Document document1 = documentRepository.findById(document.getId()).orElseThrow(RuntimeException::new);

        documentRequest.setStatus(RequestStatus.PENDING);
        documentRequest.setDocument(document1);
        documentRequest.setUser(user);
        return documentReqRepository.save(documentRequest);
    }
}
