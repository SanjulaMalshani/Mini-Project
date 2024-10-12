package com.MiniProject.automate_results.controller.resultsCollection;



import com.MiniProject.automate_results.entity.resultsCollection.ResultsCollection;
import com.MiniProject.automate_results.repository.ResultsCollectionRepository;
import com.MiniProject.automate_results.service.exception.RecordNotFoundException;
import com.MiniProject.automate_results.service.resultsCollection.ResultsCollectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results/collection")
@CrossOrigin(origins = "*")
public class ResultsCollectionController {
    private final ResultsCollectionRepository resultsCollectionRepository;
    private final ResultsCollectionService resultsCollectionService;

    public ResultsCollectionController(ResultsCollectionRepository resultsCollectionRepository, ResultsCollectionService resultsCollectionService) {
        this.resultsCollectionRepository = resultsCollectionRepository;
        this.resultsCollectionService = resultsCollectionService;
    }

    @GetMapping("")
    public ResponseEntity<List<ResultsCollection>> getAllResults(){
        List<ResultsCollection> resultsCollectionController = resultsCollectionRepository.findAll();
        return ResponseEntity.ok(resultsCollectionController);
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> generatePDF(@PathVariable String id) throws Exception {
         resultsCollectionService.saveResultsWithPdf(id);
        return ResponseEntity.ok("Succesful");
    }
}
