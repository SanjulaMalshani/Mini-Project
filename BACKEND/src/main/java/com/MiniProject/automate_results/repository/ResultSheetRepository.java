package com.MiniProject.automate_results.repository;

import com.MiniProject.automate_results.entity.results.StudentResult;
import com.MiniProject.automate_results.entity.results.SubjectResultSheet;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ResultSheetRepository extends MongoRepository<SubjectResultSheet, String> {
    // Custom query to find all SubjectResultSheets where depSecretaryStatus is APPROVED
    @Query("{ 'depSecretaryStatus' : 'APPROVED', 'depSecretaryID' : ?0, 'rejectStatus' : { $ne: 'lecture' } }")
    List<SubjectResultSheet> findByDepSecretaryStatusApprovedAndDepSecretaryId(String depSecretaryID);



    @Query("{ 'lecturerApprovalStatus' : 'APPROVED', 'lectureID' : ?0 }")
    List<SubjectResultSheet> findByLecturerStatusApprovedAndLecturerId(String lectureID);

    @Query("{ 'hodApprovalStatus' : 'APPROVED', 'hodID' : ?0 }")
    List<SubjectResultSheet> findByHodStatusApprovedAndHodId(String hodID);

    @Query("{ 'deanApproved' : 'APPROVED', 'deanID' : ?0 }")
    List<SubjectResultSheet> findByDeanStatusApprovedAndDeanId(String deanID);

    // Custom query to find all SubjectResultSheets where depSecretaryStatus is not APPROVED
    @Query("{ 'depSecretaryStatus' : { $ne: 'APPROVED' }, 'lectureID' : ?0 }")
    List<SubjectResultSheet> findByDepSecretaryStatusNotApprovedAndLecId(String lectureID);

    @Query("{ '$or': [ " +
            "{ 'depSecretaryStatus': { $ne: 'APPROVED' } }, " +
            "{ 'rejectStatus': 'lecture' } " +
            "] }")
    List<SubjectResultSheet> findByDepSecretaryStatusNotApprovedOrRejectStatusLecture();


    @Query("{ 'depSecretaryStatus' : 'APPROVED', 'lecturerApprovalStatus' : { $ne: 'APPROVED' }, 'lectureID' : ?0 }")
    List<SubjectResultSheet> findByDepSecretaryStatusApprovedAndLectureNotApprovedAndLecId(String lectureID);


    @Query("{ 'lecturerApprovalStatus' : 'APPROVED', 'hodApprovalStatus' : { $ne: 'APPROVED' } }")
    List<SubjectResultSheet> findByLecturerApprovalStatusApprovedAndHodNotApproved();

    @Query("{ 'hodApprovalStatus' : 'APPROVED', 'deanApproved' : { $ne: 'APPROVED' } }")
    List<SubjectResultSheet> findByHodApprovalStatusApprovedAndDeanNotApproved();


    // Custom query to check if a result sheet exists with the given parameters (ignoring case sensitivity)
    @Query("{ 'university' : ?0, "
            + "'faculty' : ?1, "
            + "'department' : ?2, "
            + "'degreeProgram' : ?3, "
            + "'semester' : ?4, "
            + "'batch' : ?5, "
            + "'subject' : ?6, "
            + "'subjectCode' : ?7 }")
    List<SubjectResultSheet> findByParameters(
            String university,
            String faculty,
            String department,
            String degreeProgram,
            String semester,
            String batch,
            String subject,
            String subjectCode);






}
