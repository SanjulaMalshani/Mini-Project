package com.MiniProject.automate_results.repository;

import com.MiniProject.automate_results.entity.results.SubjectResultSheet;
import com.MiniProject.automate_results.entity.resultsCollection.ResultsCollection;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ResultsCollectionRepository extends MongoRepository<ResultsCollection,String> {

    // Custom query to check if a result sheet exists with the given parameters (case-sensitive, exact match)
    @Query("{ 'university' : ?0, "
            + "'faculty' : ?1, "
            + "'department' : ?2, "
            + "'degreeProgram' : ?3, "
            + "'semester' : ?4, "
            + "'batch' : ?5 }")
    Optional<ResultsCollection> findByParameters(String university, String faculty, String department,
                                                 String degreeProgram, String semester, String batch);


    @Query("{ 'faculty' : ?0, 'deanApproveStatus' : { $ne: 'APPROVED' } }")
    List<ResultsCollection> findByFacultyAndDeanNotApproved(String faculty);

    @Query("{ 'deanApproveStatus' : 'APPROVED' }")
    List<ResultsCollection> findByDeanApproveStatusApproved();
    @Query("{ 'deanApproveStatus' : 'APPROVED', 'examinationBranchApproveStatus' : { $ne: 'APPROVED' } }")
    List<ResultsCollection> findByDeanApproveStatusApprovedAndExaminationBranchNotApproved();


    @Query("{ 'examinationBranchApproveStatus' : 'APPROVED' }")
    List<ResultsCollection> findByDeanExaminationBranchApproveStatus();

    @Query("{ 'examinationBranchApproveStatus' : 'APPROVED', 'registrarApprovedStatus': { $ne: 'APPROVED' } }")
    List<ResultsCollection> findByExaminationBranchApprovedAndRegistrarNotApproved();

    @Query("{ 'registrarApprovedStatus' : 'APPROVED', 'vcApprovedStatus' : { $ne: 'APPROVED' } }")
    List<ResultsCollection> findByRegistrarApprovedStatusAndVcNotApproved();


    @Query("{ 'registrarApprovedStatus' : 'APPROVED' }")
    List<ResultsCollection> findByRegistrarApprovedStatus();

    @Query("{ 'vcApprovedStatus' : 'APPROVED' }")
    List<ResultsCollection> findByVcApprovedStatus();

}
