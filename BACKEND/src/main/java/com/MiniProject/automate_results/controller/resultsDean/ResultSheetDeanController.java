package com.MiniProject.automate_results.controller.resultsDean;

import com.MiniProject.automate_results.controller.resultsLecAndSec.ResultSheetLecAndSecController;
import com.MiniProject.automate_results.dto.Roles;
import com.MiniProject.automate_results.entity.results.SubjectResultSheet;
import com.MiniProject.automate_results.entity.resultsCollection.ResultsCollection;
import com.MiniProject.automate_results.service.exception.RecordNotFoundException;
import com.MiniProject.automate_results.service.results.ManageResultsService;
import com.MiniProject.automate_results.service.resultsCollection.ResultsCollectionService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results/dean")
@CrossOrigin(origins = "*")
@Validated
public class ResultSheetDeanController {

    private final Logger logger = LoggerFactory.getLogger(ResultSheetLecAndSecController.class);
    private final ManageResultsService resultSheetService;
    private final ResultsCollectionService resultsCollectionService;

    public ResultSheetDeanController(ManageResultsService resultSheetService, ResultsCollectionService resultsCollectionService) {
        this.resultSheetService = resultSheetService;
        this.resultsCollectionService = resultsCollectionService;
    }


    @GetMapping("/notApproved/{id}")
    public ResponseEntity<List<SubjectResultSheet>> getApprovedSubjectResultSheets(@PathVariable String id) throws RecordNotFoundException {
        List<SubjectResultSheet> subjectResultSheet = resultSheetService.getApprovedSheet(Roles.DEAN,id);
        return ResponseEntity.ok(subjectResultSheet);
    }

    @PutMapping("/{personId}/{sheetId}")
    public ResponseEntity<SubjectResultSheet> ApproveResults(@PathVariable String personId, @PathVariable String sheetId) throws RecordNotFoundException {
        SubjectResultSheet subjectResultSheet = resultSheetService.addApproval(personId,sheetId, Roles.DEAN,null);
        return ResponseEntity.ok(subjectResultSheet);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<SubjectResultSheet>> getAllApprovedSheetsByDean(@PathVariable String id) throws RecordNotFoundException {
        List<SubjectResultSheet> subjectResultSheets = resultSheetService.getAllApprovedSheets(Roles.DEAN,id);
        return ResponseEntity.ok(subjectResultSheets);
    }

    @GetMapping("/pending/collection/{id}")
    public ResponseEntity<List<ResultsCollection>> getAllCollections(@PathVariable String id) throws RecordNotFoundException {
        List<ResultsCollection> resultsCollections = resultsCollectionService.getPendingCollection(id,Roles.DEAN);
        return ResponseEntity.ok(resultsCollections);
    }

    @PutMapping("/collection/{personId}/{sheetId}")
    public ResponseEntity<ResultsCollection> ApproveResultsCollection(@PathVariable String personId, @PathVariable String sheetId) throws Exception {
        ResultsCollection resultsCollection = resultsCollectionService.approval(personId,sheetId, Roles.DEAN);
        return ResponseEntity.ok(resultsCollection);
    }

    @GetMapping("/approve/collection/{id}")
    public ResponseEntity<List<ResultsCollection>> getAllApproveCollections(@PathVariable String id) throws RecordNotFoundException {
        List<ResultsCollection> resultsCollections = resultsCollectionService.getApproveCollection(id,Roles.DEAN);
        return ResponseEntity.ok(resultsCollections);
    }
}
