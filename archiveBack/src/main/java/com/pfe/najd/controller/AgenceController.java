package com.pfe.najd.controller;

import com.pfe.najd.entities.Agence;

import com.pfe.najd.entities.StructureCentral;
import com.pfe.najd.service.AgenceService;
import com.pfe.najd.service.implementation.AgenceServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/agences")
@RequiredArgsConstructor
public class AgenceController {

    private final AgenceService agenceService;

    @PostMapping("/create")
    public ResponseEntity<Agence> createAgence(@RequestBody Agence agence){
        Agence createdAgence = agenceService.createAgence(agence);
        return new ResponseEntity<>(createdAgence, HttpStatus.CREATED);
    }
    @GetMapping("/get-agences")
    public ResponseEntity<List<Agence>> getAllAgence() {
        List<Agence> agences = agenceService.getAllAgence();
        return new ResponseEntity<>(agences, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Agence> getAgenceById(@PathVariable("id") Long id) {
        Optional<Agence> agence = agenceService.getAgenceById(id);
        if (agence.isPresent()) {
            return new ResponseEntity<>(agence.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/get-by-code-structure/{codeStructure}")
    public ResponseEntity<List<Agence>> getAgenceByCodeStructure(@PathVariable("codeStructure") String codeStructure) {
        List<Agence> agences = agenceService.getAgenceByCodeStructure(codeStructure);
        return new ResponseEntity<>(agences, HttpStatus.OK);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Agence> updateAgence(@PathVariable("id") Long id, @RequestBody Agence updatedAgence) {
        try {
            Agence updated = agenceService.updateAgence(id, updatedAgence);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAgence(@PathVariable("id") Long id) {
        try {
            agenceService.deleteAgenceById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/get-all-agences")
    public ResponseEntity<Page<Agence>> pageAgences(Pageable pageable) {
        return ResponseEntity.ok().body(agenceService.pageAgences(pageable));
    }

    @GetMapping("/search-agence-by-name/{libelleAgence}")
    public ResponseEntity<List<Agence>> getAgenceByName(@PathVariable("libelleAgence") String libelleAgence) {
        List<Agence> agences = agenceService.getAgenceByName(libelleAgence);
        return new ResponseEntity<>(agences, HttpStatus.OK);
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<String> handleConflict(RuntimeException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
    }
}
