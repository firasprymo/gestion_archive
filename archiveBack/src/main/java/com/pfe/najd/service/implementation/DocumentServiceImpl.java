package com.pfe.najd.service.implementation;

import com.pfe.najd.entities.Document;
import com.pfe.najd.repository.DocumentRepository;
import com.pfe.najd.service.DocumentService;
import com.pfe.najd.service.StructureCentralService;
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
public class DocumentServiceImpl implements DocumentService {
    private final DocumentRepository documentRepository;
    private final StructureCentralService structureCentralService;

    //TODO: change the code of create to verify if the codeStartWith "DR"
    public Document createDocument(Document document) {
            return documentRepository.save(document);
    }


    public List<Document> getAllDocument() {
        return documentRepository.findAll();
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




    public List<Document> getDocumentByName(String codeNomenclature) {
        return documentRepository.findByCodeNomenclatureContainingIgnoreCase(codeNomenclature);
    }


    @Transactional
    public Page<Document> pageDocuments(Pageable pageable) {
        Page<Document> documents = documentRepository.findAll(pageable);

        return new PageImpl<>(documents.getContent(), documents.getPageable(), documents.getTotalElements());

    }



}
