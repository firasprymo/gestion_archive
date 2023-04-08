package com.pfe.najd.controller;

import com.pfe.najd.entities.Agence;

import com.pfe.najd.service.AgenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/agence")
public class AgenceController {

    @Autowired
    private AgenceService agenceService;



    @GetMapping("/get-agences")
    public ResponseEntity<List<Agence>> getAllAgence(){
        List<Agence> agences = agenceService.getAllAgence();
        return new ResponseEntity<>(agences, HttpStatus.OK);
    }
    @GetMapping("get-agence/{codeAgence}")
    public ResponseEntity<Agence> getAgenceById(@PathVariable("codeAgence") String codeAgence){
        Optional<Agence> agence = agenceService.getAgenceById(codeAgence);
        if (agence.isPresent()){
            return new ResponseEntity<>(agence.get(),HttpStatus.OK);
        }else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/get-by-code-structure/{codeStructure}")
    public ResponseEntity<List<Agence>> getAgenceByCodeStructure(@PathVariable("codeStructure") String codeStructure){
        List<Agence> agences = agenceService.getAgenceByCodeStructure(codeStructure);
        return new ResponseEntity<>(agences,HttpStatus.OK);
    }

    @PutMapping("/update-agence/{codeAgence}")
    public ResponseEntity<Agence> updateAgence(@PathVariable("codeAgence") String codeAgence,@RequestBody Agence updatedAgence ){
        try{
            Agence updated = agenceService.updateAgence(codeAgence, updatedAgence);
            return new ResponseEntity<>(updated,HttpStatus.OK);
        }catch (RuntimeException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/delete-agence/{codeAgence}")
    public ResponseEntity<Void> deleteAgence(@PathVariable("codeAgence")String codeAgence){
        try {
            agenceService.deleteAgenceById(codeAgence);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }catch (RuntimeException e){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @GetMapping("/search-agence-by-name/{libelleAgence}")
    public ResponseEntity<List<Agence>> getAgenceByName(@PathVariable("libelleAgence") String libelleAgence){
        List<Agence> agences = agenceService.getAgenceByName(libelleAgence);
        return new ResponseEntity<>(agences, HttpStatus.OK);
    }
    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ResponseEntity<String> handleConflict(RuntimeException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.CONFLICT);
    }
}
