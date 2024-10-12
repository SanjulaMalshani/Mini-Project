package com.MiniProject.automate_results.controller.adminController;

import com.MiniProject.automate_results.auth.RegisterRequest;
import com.MiniProject.automate_results.entity.resultsCollection.ResultsCollection;
import com.MiniProject.automate_results.service.resultsCollection.ResultsCollectionService;
import com.MiniProject.automate_results.user.User;
import com.MiniProject.automate_results.user.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/results/admin")
@CrossOrigin(origins = "*")
public class adminController {

    private final ResultsCollectionService resultsCollectionService;

    public adminController(ResultsCollectionService resultsCollectionService) {
        this.resultsCollectionService = resultsCollectionService;
    }


    @GetMapping("")
    public ResponseEntity<List<RegisterRequest>> ApproveResultsCollection() {
        List<RegisterRequest> users = resultsCollectionService.getUsers();
        System.out.println(users);
        return ResponseEntity.ok(users);
    }
}
