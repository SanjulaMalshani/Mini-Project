package com.MiniProject.automate_results.controller.resultsVC;

import com.MiniProject.automate_results.controller.resultsLecAndSec.ResultSheetLecAndSecController;
import com.MiniProject.automate_results.dto.Roles;
import com.MiniProject.automate_results.entity.resultsCollection.ResultsCollection;
import com.MiniProject.automate_results.service.exception.RecordNotFoundException;
import com.MiniProject.automate_results.service.resultsCollection.ResultsCollectionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results/vc")
@CrossOrigin(origins = "*")
@Validated
public class ResultsVCController {
    private final Logger logger = LoggerFactory.getLogger(ResultSheetLecAndSecController.class);
    private final ResultsCollectionService resultsCollectionService;


    public ResultsVCController(ResultsCollectionService resultsCollectionService) {
        this.resultsCollectionService = resultsCollectionService;
    }

    @GetMapping("/pending/collection")
    public ResponseEntity<List<ResultsCollection>> getAllCollections() throws RecordNotFoundException {
        List<ResultsCollection> resultsCollections = resultsCollectionService.getPendingCollection(null, Roles.VC);
        return ResponseEntity.ok(resultsCollections);
    }

    @PutMapping("/collection/{personId}/{sheetId}")
    public ResponseEntity<ResultsCollection> ApproveResultsCollection(@PathVariable String personId, @PathVariable String sheetId) throws Exception {
        ResultsCollection resultsCollection = resultsCollectionService.approval(personId,sheetId, Roles.VC);
        return ResponseEntity.ok(resultsCollection);
    }

    @GetMapping("/approve/collection/{id}")
    public ResponseEntity<List<ResultsCollection>> getAllApproveCollections(@PathVariable String id) throws Exception {
        List<ResultsCollection> resultsCollections = resultsCollectionService.getApproveCollection(id,Roles.VC);
        resultsCollectionService.saveResultsWithPdf(id);
        return ResponseEntity.ok(resultsCollections);
    }
}
