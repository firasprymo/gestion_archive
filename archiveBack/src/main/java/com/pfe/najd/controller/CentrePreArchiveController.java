package com.pfe.najd.controller;


import com.pfe.najd.entities.CentreArchive;
import com.pfe.najd.entities.CentrePreArchive;
import com.pfe.najd.service.CentrePreArchiveService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/centre-pre-archives")
public class CentrePreArchiveController {
    @Autowired
    private CentrePreArchiveService centrePreArchiveService;



    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<CentrePreArchive> createCentrePreArchive(@RequestBody CentrePreArchive centrePreArchive){
        CentrePreArchive createdCentrePreArchive = centrePreArchiveService.createCentrePreArchive(centrePreArchive);
        return new ResponseEntity<>(createdCentrePreArchive, HttpStatus.CREATED);
    }
    @GetMapping("/get-all-centre-pre-archives")
    public ResponseEntity<Page<CentrePreArchive>> getAllDocuments(Pageable pageable) {
        return ResponseEntity.ok().body(centrePreArchiveService.pageCentrePreArchives(pageable));
    }
    @GetMapping("/get-centre-pre-archive")
    public ResponseEntity<List<CentrePreArchive>> getAllCentrePreArchive(){
        List<CentrePreArchive> centrePreArchives = centrePreArchiveService.getAllCentrePreArchive();
        return new ResponseEntity<>(centrePreArchives,HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<CentrePreArchive> getCentrePreArchiveById(@PathVariable("id") Long id){
        Optional<CentrePreArchive> centrePreArchive = centrePreArchiveService.getCentrePreArchiveById(id);
        if(centrePreArchive.isPresent()){
            return new ResponseEntity<>(centrePreArchive.get(),HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCentrePreArchive(@PathVariable("id") Long id){
        try{
            centrePreArchiveService.deleteCentrePreArchiveId(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (RuntimeException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN')")
    @PatchMapping("/{codeCentrePreArchive}")
    public ResponseEntity<CentrePreArchive> updateCentrePreArchive(@PathVariable("codeCentrePreArchive") Long id,
                                                                   @RequestBody CentrePreArchive updatedCentrePreArchive){
        try{
            CentrePreArchive updated = centrePreArchiveService.updateCentrePreArchive(id, updatedCentrePreArchive);
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
