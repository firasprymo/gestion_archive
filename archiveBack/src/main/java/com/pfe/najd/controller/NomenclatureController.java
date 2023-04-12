package com.pfe.najd.controller;


import com.pfe.najd.entities.Nomenclature;
import com.pfe.najd.service.NomenclatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/nomenclature")
public class NomenclatureController {

    @Autowired
    private NomenclatureService nomenclatureService;

    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<Nomenclature> createNomenclature(@RequestBody Nomenclature nomenclature){
        Nomenclature createdNomenclature = nomenclatureService.createNomenclature(nomenclature);
        return new ResponseEntity<>(createdNomenclature, HttpStatus.CREATED);
    }
    @GetMapping("/get-all-nomenclature")
    public ResponseEntity<List<Nomenclature>> getAllNomenclature(){
        List<Nomenclature> nomenclatures = nomenclatureService.getAllNomenclature();
        return new ResponseEntity<>(nomenclatures, HttpStatus.OK);
    }

    @GetMapping("/get-nomenclature/{codeNomenclature}")
    public ResponseEntity<Nomenclature> getNomenclatureById(@PathVariable("codeNomenclature")Long id){
        Optional<Nomenclature> nomenclature = nomenclatureService.getNomenclatureById(id);
        return nomenclature.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    @GetMapping("/search-by-name/{designationNomenclature}")
    public ResponseEntity<List<Nomenclature>> getNomenclatureByDesignation(@PathVariable("designationNomenclature") String designationNomenclature){
        List<Nomenclature> nomenclatures = nomenclatureService.getNomenclatureDesignationNomenclature(designationNomenclature);
        return new ResponseEntity<>(nomenclatures, HttpStatus.OK);
    }

    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN')")
    @DeleteMapping("delete/{codeNomenclature}")
    public ResponseEntity<Void> deleteNomenclatureById(@PathVariable("codeNomenclature") Long id){
        try {
            nomenclatureService.deleteNomenclatureById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (RuntimeException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasAuthority('SCOPE_ROLE_ADMIN')")
    @PutMapping("/update/{codeNomenclature}")
    public ResponseEntity<Nomenclature> updateNomenclature(@PathVariable("codeNomenclature") Long id,
                                                           @RequestBody Nomenclature updatedNomenclature){
        try {
            Nomenclature updated = nomenclatureService.updateNomenclatureById(id, updatedNomenclature);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        }catch (RuntimeException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<String> handleConflict(RuntimeException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
    }


}
