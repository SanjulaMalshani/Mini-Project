package com.MiniProject.automate_results.entity.results;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Document(collection = "SUBJECT_RESULT_SHEET")
public class SubjectResultSheet {

     @Id
    private String id;

    private String lectureID;
    private String lectureName;
    private String depSecretaryID;
    private String hodID;
    private String deanID;
    private String university;
    private Integer subjectCredit;
    private String faculty;
    private String department;
    private String degreeProgram;
    @Builder.Default
    private String rejectStatus = "";
    private String rejectMessage;
    private String semester;
    private String batch;
    private String examinationHeldMonth;
    private String subject;
    private String subjectCode;
    private List<StudentResult> studentResults;
//    private List<StudentMedicalAndAbsent> studentMedicalAndAbsents;
    private String depSecretaryStatus;
    private String lecturerApprovalStatus;
    private String hodApprovalStatus;
    private String deanApproved;
    private String currentStep;  // LECTURER, SECRETARY, HOD

}



