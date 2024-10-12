package com.MiniProject.automate_results.controller.resultsHOD;

import com.MiniProject.automate_results.controller.resultsLecAndSec.ResultSheetLecAndSecController;
import com.MiniProject.automate_results.dto.Roles;
import com.MiniProject.automate_results.entity.results.SubjectResultSheet;
import com.MiniProject.automate_results.service.exception.RecordNotFoundException;
import com.MiniProject.automate_results.service.results.ManageResultsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results/hod")
@CrossOrigin(origins = "*")
public class ResultSheetHODController {

    private final Logger logger = LoggerFactory.getLogger(ResultSheetLecAndSecController.class);
    private final ManageResultsService resultSheetService;

    public ResultSheetHODController(ManageResultsService resultSheetService) {
        this.resultSheetService = resultSheetService;
    }

    @GetMapping("/getNotApprove/{id}")
    public ResponseEntity<List<SubjectResultSheet>> getApprovedSubjectResultSheets(@PathVariable String id) throws RecordNotFoundException {
        List<SubjectResultSheet> subjectResultSheet = resultSheetService.getApprovedSheet(Roles.HOD,id);
        return ResponseEntity.ok(subjectResultSheet);
    }

    @PutMapping("/{personId}/{sheetId}")
    public ResponseEntity<SubjectResultSheet> ApproveResults(@PathVariable String personId, @PathVariable String sheetId) throws RecordNotFoundException {
        SubjectResultSheet subjectResultSheet = resultSheetService.addApproval(personId,sheetId, Roles.HOD,null);
        return ResponseEntity.ok(subjectResultSheet);
    }
//Approved set
    @GetMapping("/{id}")
    public ResponseEntity<List<SubjectResultSheet>> getAllApprovedSheetsByHod(@PathVariable String id) throws RecordNotFoundException {
        List<SubjectResultSheet> subjectResultSheets = resultSheetService.getAllApprovedSheets(Roles.HOD,id);
        return ResponseEntity.ok(subjectResultSheets);
    }
}
