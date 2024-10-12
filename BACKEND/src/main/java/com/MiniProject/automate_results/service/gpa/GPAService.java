package com.MiniProject.automate_results.service.gpa;

import com.MiniProject.automate_results.entity.results.SubjectResultSheet;
import com.MiniProject.automate_results.entity.resultsCollection.ResultsCollection;
import com.MiniProject.automate_results.service.exception.RecordNotFoundException;

import java.util.Map;

public interface GPAService {
    ResultsCollection getCollection(String id) throws RecordNotFoundException;
}
