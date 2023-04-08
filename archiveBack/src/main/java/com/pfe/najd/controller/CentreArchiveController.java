package com.pfe.najd.controller;


import com.pfe.najd.entities.CentreArchive;

import com.pfe.najd.service.CentreArchiveService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/centre-archive")
@PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN','SCOPE_ROLE_RESPONSABLE')")
public class CentreArchiveController {
    @Autowired
    private CentreArchiveService centreArchiveService;



    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<CentreArchive> createCentreArchive(@RequestBody CentreArchive centreArchive){
        CentreArchive createdCentreArchive = centreArchiveService.createCentreArchive(centreArchive);
        return new ResponseEntity<>(createdCentreArchive, HttpStatus.CREATED);
    }

    @GetMapping("/get-centre-archive")
    public ResponseEntity<List<CentreArchive>> getAllCentreArchive(){
        List<CentreArchive> centreArchives = centreArchiveService.getAllCentreArchive();
        return new ResponseEntity<>(centreArchives,HttpStatus.OK);
    }
    @GetMapping("/get-centre-archive/{codeCentreArchive}")
    public ResponseEntity<CentreArchive> getCentreArchiveById(@PathVariable("codeCentreArchive") String codeCentreArchive){
        Optional<CentreArchive> centreArchive = centreArchiveService.getCentreArchiveById(codeCentreArchive);
        if(centreArchive.isPresent()){
            return new ResponseEntity<>(centreArchive.get(),HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @DeleteMapping("/delete/{codeCentreArchive}")
    public ResponseEntity<Void> deleteCentreArchive(@PathVariable("codeCentreArchive") String codeCentreArchive){
        try{
            centreArchiveService.deleteCentreArchiveId(codeCentreArchive);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (RuntimeException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN')")
    @PutMapping("/update/{codeCentreArchive}")
    public ResponseEntity<CentreArchive> updateCentreArchive(@PathVariable("codeCentreArchive") String codeCentreArchive,
                                                                   @RequestBody CentreArchive updatedCentreArchive){
        try{
            CentreArchive updated = centreArchiveService.updateCentreArchive(codeCentreArchive, updatedCentreArchive);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        }catch (RuntimeException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/search-by-name/{libelleCentreArchive}")
    public ResponseEntity<List<CentreArchive>> getCentreArchiveByName(@PathVariable("libelleCentreArchive") String libelleCentreArchive){
        List<CentreArchive> centreArchives = centreArchiveService.getCentreArchiveByName(libelleCentreArchive);
        return new ResponseEntity<>(centreArchives, HttpStatus.OK);
    }
    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<String> handleConflict(RuntimeException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
    }


}
