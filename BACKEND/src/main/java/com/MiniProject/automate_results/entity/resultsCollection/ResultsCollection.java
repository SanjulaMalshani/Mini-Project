package com.MiniProject.automate_results.entity.resultsCollection;

import com.MiniProject.automate_results.entity.gpa.StudentGPA;
import com.MiniProject.automate_results.entity.results.StudentResult;
import com.MiniProject.automate_results.entity.results.SubjectResultSheet;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Document(collection = "RESULTS_COLLECTION")
public class ResultsCollection {
    @Id
    private String id;
    private String university;
    private String faculty;
    private String department;
    private String degreeProgram;
    private String semester;
    private String batch;
    private List<StudentGPA> studentGPAS;
    private Integer NoOfResults;
    private Binary pdfContent;
    private String deanApproveStatus;
    private String examinationBranchApproveStatus;
    private String registrarApprovedStatus;
    private String vcApprovedStatus;
    private String deanId;
    private String examinationBranchId;
    private String registrarId;
    private String VCId;
    @DBRef
    private List<SubjectResultSheet> subjectResultSheets;
}
