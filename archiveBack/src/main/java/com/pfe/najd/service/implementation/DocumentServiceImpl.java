package com.pfe.najd.service.implementation;

import com.pfe.najd.Enum.DocumentStatus;
import com.pfe.najd.dao.RoleDao;
import com.pfe.najd.entities.Document;
import com.pfe.najd.entities.DocumentRequest;
import com.pfe.najd.entities.Role;
import com.pfe.najd.entities.User;
import com.pfe.najd.repository.DocumentRepository;
import com.pfe.najd.repository.DocumentRequestRepository;
import com.pfe.najd.repository.UserRepository;
import com.pfe.najd.service.DocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.Principal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DocumentServiceImpl implements DocumentService {
    private final DocumentRepository documentRepository;
    private final DocumentRequestRepository documentRequestRepository;
    private final UserRepository userRepository;
    private final RoleDao roleDao;

    //TODO: change the code of create to verify if the codeStartWith "DR"
    public Document createDocument(Document document) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User user = userRepository.findByUsername(currentPrincipalName).get();
        Document document1 = documentRepository.save(document);
        document.setStatus(DocumentStatus.PENDING);
        document.setMaturitePremAge(LocalDate.from(document.getCreationDate()
                .plusYears(Long.parseLong(document.getNomenclature().getDureeConservationPremAge()))));
        document.setMaturiteSecAge(LocalDate.from(document.getMaturitePremAge()
                .plusYears(Long.parseLong(document.getNomenclature().getDureeConservationSecAge()))));
        documentRepository.save(document);
        DocumentRequest documentRequest = new DocumentRequest();
        documentRequest.setDocument(document1);

        documentRequest.setUser(user);
        documentRequestRepository.save(documentRequest);
        return document;
    }


    public List<Document> getAllDocument() {
        List<Document> documents = documentRepository.findAll();
        for (Document item :
                documents) {
            if (LocalDate.now().isBefore(item.getMaturitePremAge())) {
                item.setStatus(DocumentStatus.MATURITY_PRIME_AGE);
                documentRepository.save(item);
            }
            if (LocalDate.now().isBefore(item.getMaturiteSecAge())) {
                item.setStatus(DocumentStatus.MATURITY_SECOND_AGE);
                documentRepository.save(item);
            }
            if (LocalDate.now().isAfter(item.getMaturiteSecAge()) && item.getNomenclature().getValeurHistoriqueTroiAge()) {
                item.setStatus(DocumentStatus.THIRD_AGE);
                documentRepository.save(item);
            }
            if (LocalDate.now().isAfter(item.getMaturiteSecAge()) && !item.getNomenclature().getValeurHistoriqueTroiAge()) {
                item.setStatus(DocumentStatus.DESTRUCTED);
                documentRepository.save(item);
            }
        }
        return documents;
    }

    public Optional<Document> getDocumentById(Long numDocument) {
        return documentRepository.findById(numDocument);
    }

    public void deleteDocumentById(Long id) {
        if (documentRepository.existsById(id)) {
            documentRepository.deleteById(id);
        } else {
            throw new RuntimeException("Direction Regional with code " + id + " does not exist.");
        }
    }

    public Document updateDocument(Long id, Document updatedDocument) {
        Optional<Document> existingDocumentOptional = documentRepository.findById(id);

        if (existingDocumentOptional.isPresent()) {
            Document existingDocument = existingDocumentOptional.get();

            if (updatedDocument.getLieuArchive() != null) {
                existingDocument.setLieuArchive(updatedDocument.getLieuArchive());
            }
            if (updatedDocument.getCodeLieuArchive() != null) {
                existingDocument.setCodeLieuArchive(updatedDocument.getCodeLieuArchive());
            }
            if (updatedDocument.getNomberPage() != null) {
                existingDocument.setNomberPage(updatedDocument.getNomberPage());
            }

            return documentRepository.save(existingDocument);
        } else {
            throw new RuntimeException("Direction Regional with code " + id + " does not exist.");
        }
    }

    public Document updateStatus(Long id, String status) {
        Optional<Document> existingDocumentRequestOptional = documentRepository.findById(id);

        if (existingDocumentRequestOptional.isPresent()) {
            Document existingDocumentRequest = existingDocumentRequestOptional.get();
            existingDocumentRequest.setStatus(DocumentStatus.PRIME_AGE);
            return documentRepository.save(existingDocumentRequest);
        } else {
            throw new RuntimeException("Document with ID " + id + " does not exist.");
        }
    }


    @Transactional
    public Page<Document> pageDocuments(Pageable pageable) {
        Page<Document> documents = documentRepository.getAllByDocumentLieuAffectationAndStatus(pageable);

        return new PageImpl<>(documents.getContent(), documents.getPageable(), documents.getTotalElements());

    }

    @Transactional
    public Page<Document> getAllByDocumentLieuAffectation(Pageable pageable) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = authentication.getName();
        User user = userRepository.findByUsername(currentPrincipalName).get();
        List<Document> documentList = new ArrayList<>();

        if (user.getRoles().stream().anyMatch(role -> role.getRoleName().equals("ROLE_RESOPONSABLE_CENTRE_PRE_ARCHIVE"))) {
            documentList = documentRepository.getAllByDocumentLieuAffectation(user.getLieuAffectation(), DocumentStatus.SECOND_AGE, pageable);
        } else if (user.getRoles().stream().anyMatch(role -> role.getRoleName().equals("ROLE_RESOPONSABLE_CENTRE_ARCHIVE"))) {
            documentList = documentRepository.getAllByDocumentLieuAffectation(user.getLieuAffectation(), DocumentStatus.PRIME_AGE, pageable);
        }
        Page<Document> documents = new PageImpl<>(documentList);
        return new PageImpl<>(documents.getContent(), documents.getPageable(), documents.getTotalElements());

    }


}
