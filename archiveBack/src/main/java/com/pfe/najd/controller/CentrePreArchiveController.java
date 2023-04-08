package com.pfe.najd.controller;


import com.pfe.najd.entities.CentreArchive;
import com.pfe.najd.entities.CentrePreArchive;
import com.pfe.najd.service.CentrePreArchiveService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/centre-pre-archive")
public class CentrePreArchiveController {
    @Autowired
    private CentrePreArchiveService centrePreArchiveService;



    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<CentrePreArchive> createCentrePreArchive(@RequestBody CentrePreArchive centrePreArchive){
        CentrePreArchive createdCentrePreArchive = centrePreArchiveService.createCentrePreArchive(centrePreArchive);
        return new ResponseEntity<>(createdCentrePreArchive, HttpStatus.CREATED);
    }

    @GetMapping("/get-centre-pre-archive")
    public ResponseEntity<List<CentrePreArchive>> getAllCentrePreArchive(){
        List<CentrePreArchive> centrePreArchives = centrePreArchiveService.getAllCentrePreArchive();
        return new ResponseEntity<>(centrePreArchives,HttpStatus.OK);
    }
    @GetMapping("/get-centre-pre-archive/{codeCentrePreArchive}")
    public ResponseEntity<CentrePreArchive> getCentrePreArchiveById(@PathVariable("codeCentrePreArchive") String codeCentrePreArchive){
        Optional<CentrePreArchive> centrePreArchive = centrePreArchiveService.getCentrePreArchiveById(codeCentrePreArchive);
        if(centrePreArchive.isPresent()){
            return new ResponseEntity<>(centrePreArchive.get(),HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasAnyAuthority()")
    @DeleteMapping("/delete/{codeCentrePreArchive}")
    public ResponseEntity<Void> deleteCentrePreArchive(@PathVariable("codeCentreArchive") String codeCentrePreArchive){
        try{
            centrePreArchiveService.deleteCentrePreArchiveId(codeCentrePreArchive);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (RuntimeException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN')")
    @PutMapping("/update/{codeCentrePreArchive}")
    public ResponseEntity<CentrePreArchive> updateCentrePreArchive(@PathVariable("codeCentrePreArchive") String codeCentrePreArchive,
                                                                   @RequestBody CentrePreArchive updatedCentrePreArchive){
        try{
            CentrePreArchive updated = centrePreArchiveService.updateCentrePreArchive(codeCentrePreArchive, updatedCentrePreArchive);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        }catch (RuntimeException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/search-by-name/{libelleCentrePreArchive}")
    public ResponseEntity<List<CentrePreArchive>> getCentrePreArchiveByName(@PathVariable("libelleCentrePreArchive") String libelleCentrePreArchive){
        List<CentrePreArchive> centrePreArchives = centrePreArchiveService.getCentrePreArchiveByName(libelleCentrePreArchive);
        return new ResponseEntity<>(centrePreArchives, HttpStatus.OK);
    }
    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<String> handleConflict(RuntimeException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
    }


}
