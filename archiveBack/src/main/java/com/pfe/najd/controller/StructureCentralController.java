package com.pfe.najd.controller;


import com.pfe.najd.dto.StructureCentralDTO;
import com.pfe.najd.entities.Agence;
import com.pfe.najd.entities.StructureCentral;
import com.pfe.najd.service.StructureCentralService;
import org.springframework.beans.factory.annotation.Autowired;
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
//    @PostMapping
//    public ResponseEntity<StructureCentral> createStructureCentral(@RequestBody StructureCentral structureCentral){
//        StructureCentral createdStructureCentral = structureCentralService.createStructureCentral(structureCentral);
//        return new ResponseEntity<>(createdStructureCentral, HttpStatus.CREATED);
//    }


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
    @GetMapping("/get-Structure/{codeStructure}")
    public ResponseEntity<StructureCentral> getStructureCentralById(@PathVariable("codeStructure") String codeStructure) {
        Optional<StructureCentral> structureCentral = structureCentralService.getStructureCentralById(codeStructure);
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
    public ResponseEntity<StructureCentral> updateStructureCentral(@PathVariable("codeStructure") String codeStructure, @RequestBody StructureCentral updatedStructureCentral){
        try{
            StructureCentral updated = structureCentralService.updateStructureCentral(codeStructure, updatedStructureCentral);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        }catch (RuntimeException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    //delete Structure Central by Id
    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN')")
    @DeleteMapping("/delete/{codeStructure}")
    public ResponseEntity<Void> deleteCodeStructureById(@PathVariable("codeStructure") String codeStrucutre){
        try{
            structureCentralService.deleteStructureCentralById(codeStrucutre);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (RuntimeException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN')")
    @PostMapping("/{structureCentralCode}/agence")
    public ResponseEntity<Agence>addNewAgence(@PathVariable String structureCentralCode, @RequestBody  Agence agence){
        Agence createdAgence = structureCentralService.addNewAgence(structureCentralCode,agence);
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
        dto.setDirectionRegionalCode(structureCentral.getDirectionRegional().getCodeDirection());

        return dto;
    }

}
