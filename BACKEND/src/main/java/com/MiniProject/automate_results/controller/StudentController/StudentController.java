package com.MiniProject.automate_results.controller.StudentController;

import com.MiniProject.automate_results.dto.Roles;
import com.MiniProject.automate_results.entity.resultsCollection.ResultsCollection;
import com.MiniProject.automate_results.service.resultsCollection.ResultsCollectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results/student")
@CrossOrigin(origins = "*")
public class StudentController {
    private final ResultsCollectionService resultsCollectionService;

    public StudentController(ResultsCollectionService resultsCollectionService) {
        this.resultsCollectionService = resultsCollectionService;
    }

    @GetMapping("")
    public ResponseEntity<List<ResultsCollection>> ApproveResultsCollection() throws Exception {
        List<ResultsCollection> resultsCollection = resultsCollectionService.getApproveCollectionForStudent();
        return ResponseEntity.ok(resultsCollection);
    }
}
