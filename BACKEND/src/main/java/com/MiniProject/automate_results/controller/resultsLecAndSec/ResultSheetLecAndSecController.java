package com.MiniProject.automate_results.controller.resultsLecAndSec;

import com.MiniProject.automate_results.dto.Roles;
import com.MiniProject.automate_results.dto.resluts.DepSecretarySubjectResultSheetDto;
import com.MiniProject.automate_results.dto.resluts.LectureSubjectResultSheetDto;
import com.MiniProject.automate_results.dto.resluts.RejectedDetailsDTO;
import com.MiniProject.automate_results.entity.results.SubjectResultSheet;
import com.MiniProject.automate_results.service.exception.DuplicateRecordException;
import com.MiniProject.automate_results.service.exception.RecordNotFoundException;
import com.MiniProject.automate_results.service.results.ManageResultsService;
import com.MiniProject.automate_results.user.Role;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
@CrossOrigin(origins = "*")
@Validated
public class ResultSheetLecAndSecController {

    private final Logger logger = LoggerFactory.getLogger(ResultSheetLecAndSecController.class);
    private final ManageResultsService resultSheetService;

    public ResultSheetLecAndSecController(ManageResultsService resultSheetService) {
        this.resultSheetService = resultSheetService;
    }


    @PostMapping("/create")
    public ResponseEntity<SubjectResultSheet> createResultsByLec(
            @RequestBody @Valid LectureSubjectResultSheetDto lectureSubjectResultSheetDto) throws RecordNotFoundException, DuplicateRecordException {
            SubjectResultSheet subjectResultSheet = resultSheetService.createAndUpdateResults(null,null, lectureSubjectResultSheetDto);

            logger.info("Result sheet successfully created. Result Sheet ID: {}", subjectResultSheet.getId());
            return ResponseEntity.ok(subjectResultSheet);
    }

    @PutMapping("/update/{id}/{lecId}")
    public ResponseEntity<SubjectResultSheet> updateResultsByLec(
            @RequestBody @Valid LectureSubjectResultSheetDto lectureSubjectResultSheetDto,
            @PathVariable String id,
            @PathVariable String lecId
            ) throws RecordNotFoundException, DuplicateRecordException {
        SubjectResultSheet subjectResultSheet = resultSheetService.createAndUpdateResults(id,lecId, lectureSubjectResultSheetDto);

        logger.info("Result sheet successfully update. Result Sheet ID: {}", subjectResultSheet.getId());
        return ResponseEntity.ok(subjectResultSheet);
    }

    @PutMapping("/updateBySec/{id}/{lecId}")
    public ResponseEntity<SubjectResultSheet> updateResultsBySec(
            @RequestBody @Valid LectureSubjectResultSheetDto lectureSubjectResultSheetDto,
            @PathVariable String id,
            @PathVariable String lecId
    ) throws RecordNotFoundException, DuplicateRecordException {
        SubjectResultSheet subjectResultSheet = resultSheetService.UpdateResultsBySec(id,lecId, lectureSubjectResultSheetDto);

        return ResponseEntity.ok(subjectResultSheet);
    }

    @PutMapping("/rejectLec/{id}/{lecId}")
    public ResponseEntity<SubjectResultSheet> rejectResultsByLec(
            @RequestBody @Valid LectureSubjectResultSheetDto lectureSubjectResultSheetDto,
            @PathVariable String id,
            @PathVariable String lecId
    ) throws RecordNotFoundException, DuplicateRecordException {
        SubjectResultSheet subjectResultSheet = resultSheetService.UpdateRejectedResults(id,lecId, lectureSubjectResultSheetDto, Role.LECTURE);

        logger.info("Result sheet successfully update. Result Sheet ID: {}", subjectResultSheet.getId());
        return ResponseEntity.ok(subjectResultSheet);
    }

    @PutMapping("/rejectSec/{id}/{personId}")
    public ResponseEntity<SubjectResultSheet> rejectResultsBySecretary(
            @RequestBody @Valid LectureSubjectResultSheetDto lectureSubjectResultSheetDto,
            @PathVariable String id,
            @PathVariable String personId
    ) throws RecordNotFoundException, DuplicateRecordException {
        SubjectResultSheet subjectResultSheet = resultSheetService.UpdateRejectedResults(id,personId, lectureSubjectResultSheetDto, Role.SECRETARY);
        return ResponseEntity.ok(subjectResultSheet);
    }

    @GetMapping("/getPending/{id}")
    public ResponseEntity<List<SubjectResultSheet>> getPendingSubjectResultSheets(@PathVariable String id) throws RecordNotFoundException {
        List<SubjectResultSheet> subjectResultSheet = resultSheetService.getPendingSheet(id);
        return ResponseEntity.ok(subjectResultSheet);
    }

    @GetMapping("/getApproved/{id}")
    public ResponseEntity<List<SubjectResultSheet>> getApprovedSubjectResultSheets(@PathVariable String id) throws RecordNotFoundException {
        List<SubjectResultSheet> subjectResultSheet = resultSheetService.getApprovedSheet(Roles.LECTURE,id);
        return ResponseEntity.ok(subjectResultSheet);
    }
//    @PutMapping("/update/{id}")
//    public ResponseEntity<SubjectResultSheet> UpdateResultsByLec(
//            @PathVariable String id,
//            @RequestBody @Valid LectureSubjectResultSheetDto lectureSubjectResultSheetDto) throws RecordNotFoundException, DuplicateRecordException {
//
//            logger.info("Received request to update result sheet. ID: {}", id);
//            SubjectResultSheet subjectResultSheet = resultSheetService.createAndUpdateResults(id, lectureSubjectResultSheetDto);
//
//            logger.info("Result sheet successfully updated. Result Sheet ID: {}", subjectResultSheet.getId());
//            return ResponseEntity.ok(subjectResultSheet);
//    }

    @PutMapping("/lecApproved/{personId}/{sheetId}")
    public ResponseEntity<SubjectResultSheet> ApproveResultsByLec(@PathVariable String personId,@PathVariable String sheetId,@RequestBody @Valid LectureSubjectResultSheetDto lectureSubjectResultSheetDto) throws RecordNotFoundException {
        SubjectResultSheet subjectResultSheet = resultSheetService.addApproval(personId,sheetId, Roles.LECTURE,lectureSubjectResultSheetDto);
        return ResponseEntity.ok(subjectResultSheet);
    }

    @GetMapping("/secApproved/{id}")
    public ResponseEntity<List<SubjectResultSheet>> getAllApprovedSheetsBySec(@PathVariable String id) throws RecordNotFoundException {
            List<SubjectResultSheet> subjectResultSheets = resultSheetService.getAllApprovedSheets(Roles.SECRETARY,id);
            return ResponseEntity.ok(subjectResultSheets);
    }

    @GetMapping("/lecApproved/{id}")
    public ResponseEntity<List<SubjectResultSheet>> getAllApprovedSheetsByLec(@PathVariable String id) throws RecordNotFoundException {
        List<SubjectResultSheet> subjectResultSheets = resultSheetService.getAllApprovedSheets(Roles.LECTURE,id);
        return ResponseEntity.ok(subjectResultSheets);
    }

    //Department secretary

    @PostMapping("/updateByDepSecretary/{sheetId}")
    public ResponseEntity<SubjectResultSheet> updateStudentsResultsByDepSecretary(
            @PathVariable String sheetId,
            @RequestBody @Valid DepSecretarySubjectResultSheetDto depSecretarySubjectResultSheetDto) throws RecordNotFoundException {

            logger.info("Received request to update result sheet by DepSecretary. Sheet ID: {}", sheetId);

            SubjectResultSheet updatedResultSheet = resultSheetService.UpdateStudentsResultsByDepSecretary(sheetId, depSecretarySubjectResultSheetDto);
            logger.info("Result sheet successfully updated by DepSecretary. Result Sheet ID: {}", updatedResultSheet.getId());
            return ResponseEntity.ok(updatedResultSheet);

    }

    @GetMapping("/getApprovedBySec/{id}")
    public ResponseEntity<List<SubjectResultSheet>> getApprovedSubjectResultSheetsBySec(@PathVariable String id) throws RecordNotFoundException {
        List<SubjectResultSheet> subjectResultSheet = resultSheetService.getApprovedSheet(Roles.SECRETARY,id);
        return ResponseEntity.ok(subjectResultSheet);
    }
}

