package com.MiniProject.automate_results.dto.resluts;

import com.MiniProject.automate_results.entity.results.StudentResult;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class DepSecretarySubjectResultSheetDto {
    @Id
    private String id;

    @NotNull(message = "Lecture ID cannot be null")
    @NotEmpty(message = "Lecture ID cannot be empty")
    private String lectureID;

    @NotNull(message = "University cannot be null")
    @NotEmpty(message = "University cannot be empty")
    private String university;

    @NotNull(message = "Faculty cannot be null")
    @NotEmpty(message = "Faculty cannot be empty")
    private String faculty;

    @NotNull(message = "Department cannot be null")
    @NotEmpty(message = "Department cannot be empty")
    private String department;

    @NotNull(message = "Degree Program cannot be null")
    @NotEmpty(message = "Degree Program cannot be empty")
    private String degreeProgram;

    @NotNull(message = "Semester cannot be null")
    @NotEmpty(message = "Semester cannot be empty")
    private String semester;

    @NotNull(message = "Batch cannot be null")
    @NotEmpty(message = "Batch cannot be empty")
    private String batch;

    @NotNull(message = "Examination Held Month cannot be null")
    @NotEmpty(message = "Examination Held Month cannot be empty")
    private String examinationHeldMonth;

    @NotNull(message = "Subject cannot be null")
    @NotEmpty(message = "Subject cannot be empty")
    private String subject;

    @NotNull(message = "Subject Code cannot be null")
    @NotEmpty(message = "Subject Code cannot be empty")
    private String subjectCode;

    @NotNull(message = "Student Results cannot be null")
    @Size(min = 1, message = "There should be at least one student result")
    private List<@Valid StudentResult> studentResults;

    @NotBlank(message = "Department Secretary ID cannot be blank")
    private String depSecretaryID;
}
