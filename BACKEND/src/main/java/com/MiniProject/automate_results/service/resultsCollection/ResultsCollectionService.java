package com.MiniProject.automate_results.service.resultsCollection;

import com.MiniProject.automate_results.auth.RegisterRequest;
import com.MiniProject.automate_results.dto.Roles;
import com.MiniProject.automate_results.entity.resultsCollection.ResultsCollection;
import com.MiniProject.automate_results.service.exception.RecordNotFoundException;
import com.MiniProject.automate_results.user.User;

import java.util.List;

public interface ResultsCollectionService {
    public void saveResultsWithPdf(String id) throws Exception;
    public List<ResultsCollection> getPendingCollection(String id, Roles roles) throws RecordNotFoundException;
    ResultsCollection approval(String personalId,String sheetId, Roles roles) throws Exception;

    List<ResultsCollection> getApproveCollection(String id, Roles roles) throws RecordNotFoundException;
    List<ResultsCollection> getApproveCollectionForStudent() throws RecordNotFoundException;
    List<RegisterRequest> getUsers();

}
