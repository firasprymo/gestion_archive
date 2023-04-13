package com.pfe.najd.controller;

import com.pfe.najd.entities.DirectionRegional;
import com.pfe.najd.entities.StructureCentral;
import com.pfe.najd.service.implementation.DirectionRegionalServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController

@RequestMapping("/api/direction-regional")
public class DirectionRegionalController {
    @Autowired
    private DirectionRegionalServiceImpl directionRegionalService;

    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN')")
    @PostMapping("/create")
    public ResponseEntity<DirectionRegional> createDirectionRegional(@RequestBody DirectionRegional directionRegional){
        DirectionRegional createdDirectionRegional  = directionRegionalService.createDirectionRegional(directionRegional);
        return new ResponseEntity<>(createdDirectionRegional, HttpStatus.CREATED);
    }

    @GetMapping("/get-direction-regional")
    public ResponseEntity<List<DirectionRegional>> getAllDirectionRegional(){
        List<DirectionRegional> directionRegionals = directionRegionalService.getAllDirectionRegional();
        return new ResponseEntity<>(directionRegionals, HttpStatus.OK);
    }
    @GetMapping("/get-all-direction-regionals")
    public ResponseEntity<Page<DirectionRegional>> getAllLessons(Pageable pageable) {
        return ResponseEntity.ok().body(directionRegionalService.pageDirectionRegionals(pageable));
    }
    @GetMapping("/get-direction/{codeDirection}")
    public ResponseEntity<DirectionRegional> getDirectionRegionalById(@PathVariable("codeDirection") Long id){
        Optional<DirectionRegional> directionRegional = directionRegionalService.getDirectionRegionalById(id);
        if(directionRegional.isPresent()){
            return new ResponseEntity<>(directionRegional.get(),HttpStatus.OK);
        }else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete DirectionRegional by code
    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN')")
    @DeleteMapping("/{codeDirection}")
    public ResponseEntity<Void> deleteDirectionRegionalById(@PathVariable("codeDirection") Long id) {
        try {
            directionRegionalService.deleteDirectionRegionalById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update DirectionRegional by code
    @PreAuthorize("hasAnyAuthority('SCOPE_ROLE_ADMIN')")
    @PutMapping("/update/{codeDirection}")
    public ResponseEntity<DirectionRegional> updateDirectionRegional(@PathVariable("codeDirection") Long id, @RequestBody DirectionRegional updatedDirectionRegional) {
        try {
            DirectionRegional updated = directionRegionalService.updateDirectionRegional(id, updatedDirectionRegional);
            return new ResponseEntity<>(updated, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/{directionRegionalCode}/structure-central")
    public ResponseEntity<StructureCentral> addNewStructureCentral(@PathVariable Long directionRegionalCode, @RequestBody StructureCentral structureCentral) {
        StructureCentral createdStructureCentral = directionRegionalService.addNewStructureCentral(directionRegionalCode, structureCentral);
        return new ResponseEntity<>(createdStructureCentral, HttpStatus.CREATED);
    }

    @GetMapping("/search-by-name/{libelleDirection}")
    public ResponseEntity<List<DirectionRegional>> getDirectionRegionalByName(@PathVariable("libelleDirection") String libelleDirection) {
        List<DirectionRegional> directionRegionals = directionRegionalService.getDirectionRegionalByName(libelleDirection);
        return new ResponseEntity<>(directionRegionals, HttpStatus.OK);
    }



    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<String> handleConflict(RuntimeException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
    }


}
