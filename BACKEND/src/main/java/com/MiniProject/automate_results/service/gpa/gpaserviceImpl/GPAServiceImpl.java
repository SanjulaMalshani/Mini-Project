package com.MiniProject.automate_results.service.gpa.gpaserviceImpl;

import com.MiniProject.automate_results.entity.gpa.GradeMapping;
import com.MiniProject.automate_results.entity.gpa.StudentGPA;
import com.MiniProject.automate_results.entity.results.StudentResult;
import com.MiniProject.automate_results.entity.results.SubjectResultSheet;
import com.MiniProject.automate_results.entity.resultsCollection.ResultsCollection;
import com.MiniProject.automate_results.repository.ResultsCollectionRepository;
import com.MiniProject.automate_results.service.exception.RecordNotFoundException;
import com.MiniProject.automate_results.service.gpa.GPAService;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class GPAServiceImpl implements GPAService {
    private final ResultsCollectionRepository resultsCollectionRepository;

    public GPAServiceImpl(ResultsCollectionRepository resultsCollectionRepository) {
        this.resultsCollectionRepository = resultsCollectionRepository;
    }

    public ResultsCollection getCollection(String id) throws RecordNotFoundException {
        Optional<ResultsCollection> resultsCollection = resultsCollectionRepository.findById(id);
        if (resultsCollection.isPresent()) {
            ResultsCollection resultsCollection1 = resultsCollection.get();
            ResultsCollection resultsCollection2 = calculateAndStoreGpa(resultsCollection1);
            resultsCollectionRepository.save(resultsCollection2);
            return resultsCollection2;
        } else {
            throw new RecordNotFoundException("Collection not found");
        }
    }

    public ResultsCollection calculateAndStoreGpa(ResultsCollection resultsCollection) {
        Map<String, List<SubjectGrade>> studentGrades = new HashMap<>();
        List<StudentGPA> studentGPAS = new ArrayList<>();

        // Loop through each subject result sheet
        for (SubjectResultSheet subjectResultSheet : resultsCollection.getSubjectResultSheets()) {
            int subjectCredit = subjectResultSheet.getSubjectCredit();

            // Loop through each student result in the subject
            for (StudentResult studentResult : subjectResultSheet.getStudentResults()) {
                String index = studentResult.getIndex();
                String grade = studentResult.getGrade();

                // Calculate grade value and store it with subject credit
                double gradeValue = GradeMapping.getGradeValue(grade);
                studentGrades
                        .computeIfAbsent(index, k -> new ArrayList<>())
                        .add(new SubjectGrade(subjectCredit, gradeValue));
            }
        }

        // Calculate GPA for each student index
        for (Map.Entry<String, List<SubjectGrade>> entry : studentGrades.entrySet()) {
            String studentIndex = entry.getKey();
            List<SubjectGrade> grades = entry.getValue();

            // Calculate total credits including zero-grade subjects
            double totalCredits = grades.stream().mapToDouble(SubjectGrade::getCredit).sum();

            // Calculate weighted GPA
            double weightedGradeSum = grades.stream()
                    .mapToDouble(grade -> grade.getCredit() * grade.getGradeValue())
                    .sum();

            // GPA calculation
            double gpa = weightedGradeSum / totalCredits;

            // Create a StudentGPA object and add it to the list
            StudentGPA studentGPA = new StudentGPA();
            studentGPA.setIndex(studentIndex);
            studentGPA.setGpa(gpa);
            studentGPAS.add(studentGPA);
        }

        // Set the studentGPAS list in ResultsCollection
        resultsCollection.setStudentGPAS(studentGPAS);

        return resultsCollection; // or save to the database as needed
    }
}

class SubjectGrade {
    private final int credit;
    private final double gradeValue;

    public SubjectGrade(int credit, double gradeValue) {
        this.credit = credit;
        this.gradeValue = gradeValue;
    }

    public int getCredit() {
        return credit;
    }

    public double getGradeValue() {
        return gradeValue;
    }
}
