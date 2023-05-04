package com.pfe.najd.controller;


import com.pfe.najd.dto.StructureCentralDTO;
import com.pfe.najd.entities.Agence;
import com.pfe.najd.entities.CentreArchive;
import com.pfe.najd.entities.StructureCentral;
import com.pfe.najd.service.StructureCentralService;
import com.pfe.najd.service.implementation.StructureCentralServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController

@RequestMapping("/api/structure-central")
public class StructureCentralController {

    @Autowired
    private StructureCentralService structureCentralService;

    //Create new Structure
    @PostMapping("/create")
    public ResponseEntity<StructureCentral> createStructureCentral(@RequestBody StructureCentral structureCentral){
        StructureCentral createdStructureCentral = structureCentralService.createStructureCentral(structureCentral);
        return new ResponseEntity<>(createdStructureCentral, HttpStatus.CREATED);
    }
    @GetMapping("/get-all-structure-central")
    public ResponseEntity<Page<StructureCentral>> pageStructureCentrals(Pageable pageable) {
        return ResponseEntity.ok().body(structureCentralService.pageStructureCentrals(pageable));
    }

    // Get all StructureCentrals
    @GetMapping("/get-structure")
    public ResponseEntity<List<StructureCentralDTO>> getAllStructureCentral() {
        List<StructureCentral> structureCentrals = structureCentralService.getAllStructureCentral();
        List<StructureCentralDTO> structureCentralDTOs = structureCentrals.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());

        return ResponseEntity.ok(structureCentralDTOs);
    }

    // Get StructureCentral by code
    @GetMapping("/{id}")
    public ResponseEntity<StructureCentral> getStructureCentralById(@PathVariable("id") Long id) {
        Optional<StructureCentral> structureCentral = structureCentralService.getStructureCentralById(id);
        if (structureCentral.isPresent()) {
            return new ResponseEntity<>(structureCentral.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/by-direction/{codeDirection}")
    public ResponseEntity<List<StructureCentral>> getStructureCentralByCodeDirection(@PathVariable("codeDirection") String codeDirection) {
        List<StructureCentral> structureCentrals = structureCentralService.getStructureCentralByCodeDirection(codeDirection);
        return new ResponseEntity<>(structureCentrals, HttpStatus.OK);
    }

    //update Structure Central By code
    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN')")
    @PutMapping("/update/{codeStructure}")
    public ResponseEntity<StructureCentral> updateStructureCentral(@PathVariable("codeStructure") Long id, @RequestBody StructureCentral updatedStructureCentral){
        try{
            StructureCentral updated = structureCentralService.updateStructureCentral(id, updatedStructureCentral);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        }catch (RuntimeException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    //delete Structure Central by Id
    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCodeStructureById(@PathVariable("id") Long id){
        try{
            structureCentralService.deleteStructureCentralById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (RuntimeException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN')")
    @PostMapping("/{structureCentralCode}/agence")
    public ResponseEntity<Agence>addNewAgence(@PathVariable Long id, @RequestBody  Agence agence){
        Agence createdAgence = structureCentralService.addNewAgence(id,agence);
        return new ResponseEntity<>(createdAgence, HttpStatus.CREATED);
    }

    @GetMapping("search-by-name/{libelleStructure}")
    public ResponseEntity<List<StructureCentral>> getStructureCentralByName(@PathVariable("libelleStructure") String libelleStructure){
        List<StructureCentral> structureCentrals = structureCentralService.getStrucutureCentralByName(libelleStructure);
        return new ResponseEntity<>(structureCentrals, HttpStatus.OK);
    }


    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<String> handleConflict(RuntimeException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
    }

    private StructureCentralDTO convertToDTO(StructureCentral structureCentral) {
        StructureCentralDTO dto = new StructureCentralDTO();
        dto.setCodeStructure(structureCentral.getCodeStructure());
        dto.setLibelleStructure(structureCentral.getLibelleStructure());
        dto.setLieuArchive(structureCentral.getLieuArchive());
        dto.setLieuArchiveSecAge(structureCentral.getLieuArchiveSecAge());
//        dto.setDirectionRegionalCode(structureCentral.getDirectionRegional().getCodeDirection());

        return dto;
    }

}
