package com.pfe.najd.service.implementation;

import com.pfe.najd.Enum.DocumentStatus;
import com.pfe.najd.Enum.RequestStatus;
import com.pfe.najd.controller.RequestStatusDTO;
import com.pfe.najd.dao.AgenceDao;
import com.pfe.najd.dto.DocumentVersementDTO;
import com.pfe.najd.entities.*;
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
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DocumentRequestServiceImpl implements DocumentRequestService {
    private final DocumentRequestRepository documentReqRepository;
    private final DocumentRepository documentRepository;
    private final UserRepository userRepository;
    private final AgenceDao agenceDaoo;

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
        documentRequest.getDocument().setStatus(DocumentStatus.valueOf(status));
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User user = userRepository.findByUsername(currentPrincipalName).get();

        if (documentRequest.getDocument().getStatus().equals(DocumentStatus.SECOND_AGE)) {
            if (user.getAgence() != null) {

                documentRequest.getDocument().setLieuArchive(user.getAgence().getLieuArchiveSecAge());
                documentRequest.getDocument().setCodeLieuArchive(user.getAgence().getLieuArchiveSecAge());
            } else if (user.getDirectionRegional() != null) {
                documentRequest.getDocument().setLieuArchive(user.getDirectionRegional().getLieuArchiveSecAge());
                documentRequest.getDocument().setCodeLieuArchive(user.getDirectionRegional().getLieuArchiveSecAge());

            } else if (user.getStructureCentral() != null) {
                documentRequest.getDocument().setLieuArchive(user.getStructureCentral().getLieuArchiveSecAge());
                documentRequest.getDocument().setCodeLieuArchive(user.getStructureCentral().getLieuArchiveSecAge());

            }
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
        Set<DocumentRequest> documentRequestSet = documentReqRepository.findAll().stream()
                .collect(Collectors.groupingBy(DocumentRequest::getDocument))
                .entrySet().stream()
                .map(entry -> {

                            DocumentRequest original = entry.getValue().get(0);
                            Document distinctDocument = entry.getKey();
                            return new DocumentRequest(original.getId(), null, distinctDocument, original.getUser());
                        }
                )
                .collect(Collectors.toSet());
        List<DocumentRequest> documentRequestList1 = new ArrayList<>(documentRequestSet);
        Page<DocumentRequest> documentRequestPage = new PageImpl<>(documentRequestList1);
        for (DocumentRequest item :
                documentRequestPage) {
            if (!item.getDocument().getStatus().equals(DocumentStatus.PENDING) ||
                    !item.getDocument().getStatus().equals(DocumentStatus.PENDING_VERSEMENT)) {

                if (LocalDate.now().isAfter(item.getDocument().getMaturitePremAge())) {
                    item.getDocument().setStatus(DocumentStatus.MATURITY_PRIME_AGE);
                    documentReqRepository.save(item);
                } else if (LocalDate.now().isAfter(item.getDocument().getMaturiteSecAge())) {
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
        return new PageImpl<>(documentRequestPage.getContent(), documentRequestPage.getPageable(), documentRequestPage.getTotalElements());

    }

    @Transactional
    public Page<DocumentRequest> getAllPendingDocuments(Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User user = userRepository.findByUsername(currentPrincipalName).get();
        Page<DocumentRequest> documents = getDistinct(documentReqRepository.findAllByDocumentStatusAndLieuAffectation(user.getLieuAffectation()));


        return new PageImpl<>(documents.getContent(), documents.getPageable(), documents.getTotalElements());

    }

    @Transactional
    public Page<DocumentRequest> getAllRequestConsultDocuments(Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User user = userRepository.findByUsername(currentPrincipalName).get();
        Page<DocumentRequest> documents = getDistinct(documentReqRepository.findAllByStatusAndLieuAffectation(user.getLieuAffectation()));

        return new PageImpl<>(documents.getContent(), documents.getPageable(), documents.getTotalElements());

    }


    public Page<DocumentRequest> getAllDocumentPrimeAge(Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User user = userRepository.findByUsername(currentPrincipalName).get();
        Set<DocumentRequest> documents = documentReqRepository.findAllByDocumentStatusAndLieuAffectationOrderByDocument(user.getLieuAffectation());
        List<DocumentRequest> documentRequestList = documents.stream()
                .collect(Collectors.groupingBy(DocumentRequest::getDocument))
                .entrySet().stream()
                .map(entry -> {

                            DocumentRequest original = entry.getValue().get(0);
                            Document distinctDocument = entry.getKey();
                            return new DocumentRequest(original.getId(), null, distinctDocument, original.getUser());
                        }
                )
                .collect(Collectors.toList());
        Page<DocumentRequest> documentRequestPage = new PageImpl<>(documentRequestList);
        return new PageImpl<>(documentRequestPage.getContent(), documentRequestPage.getPageable(), documentRequestPage.getTotalElements());
    }

    @Transactional
    public Page<DocumentRequest> getAllDocumentVersementRequest(Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User user = userRepository.findByUsername(currentPrincipalName).get();
        Page<DocumentRequest> documents = getDistinct(documentReqRepository.findAllByDocumentStatusAndLieuAffectationOrderById(user.getLieuAffectation()));
        return new PageImpl<>(documents.getContent(), documents.getPageable(), documents.getTotalElements());
    }

    @Transactional
    public void createDemandeVersement(List<Document> documentList) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User user = userRepository.findByUsername(currentPrincipalName).get();
        for (Document document : documentList) {
            DocumentRequest documentRequests = new DocumentRequest();
            Document documentRequested = documentRepository.findById(document.getId()).orElseThrow(RuntimeException::new);
            documentRequested.setStatus(DocumentStatus.PENDING_VERSEMENT);
            documentRepository.save(documentRequested);
            documentRequests.setDocument(documentRequested);
            documentRequests.setUser(user);
            documentReqRepository.save(documentRequests);
        }
    }
    @Transactional
    public void createDemandeVersementThird(List<Document> documentList) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User user = userRepository.findByUsername(currentPrincipalName).get();
        for (Document document : documentList) {
            DocumentRequest documentRequests = new DocumentRequest();
            Document documentRequested = documentRepository.findById(document.getId()).orElseThrow(RuntimeException::new);
            documentRequested.setStatus(DocumentStatus.THIRD_AGE);
            documentRepository.save(documentRequested);
            documentRequests.setDocument(documentRequested);
            documentRequests.setUser(user);
            documentReqRepository.save(documentRequests);
        }
    }

    @Transactional
    public Page<DocumentRequest> getAllDocumentsDeuxieme(Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User user = userRepository.findByUsername(currentPrincipalName).get();
        Page<DocumentRequest>    documents= getDistinct(documentReqRepository.getAllDeuxiemeAge(user.getLieuAffectation()));
        return new PageImpl<>(documents.getContent(), documents.getPageable(), documents.getTotalElements());

    }

    @Transactional
    public Page<DocumentRequest> getAllDocumentsTroisieme(Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User user = userRepository.findByUsername(currentPrincipalName).get();

        Page<DocumentRequest> documents =getDistinct(documentReqRepository.getAllTroisiemeAge(user.getLieuAffectation()));

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


    private Page<DocumentRequest> getDistinct(Set<DocumentRequest> documentRequests) {
        List<DocumentRequest> documentRequestList = documentRequests.stream()
                .collect(Collectors.groupingBy(DocumentRequest::getDocument))
                .entrySet().stream()
                .map(entry -> {

                            DocumentRequest original = entry.getValue().get(0);
                            Document distinctDocument = entry.getKey();
                            return new DocumentRequest(original.getId(), null, distinctDocument, original.getUser());
                        }
                )
                .collect(Collectors.toList());
        Page<DocumentRequest> documents = new PageImpl<>(documentRequestList);
        return documents;
    }
}
