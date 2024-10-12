package com.MiniProject.automate_results.service.resultsCollection.impl;

import com.MiniProject.automate_results.auth.RegisterRequest;
import com.MiniProject.automate_results.dto.Roles;
import com.MiniProject.automate_results.entity.gpa.StudentGPA;
import com.MiniProject.automate_results.entity.results.StudentResult;
import com.MiniProject.automate_results.entity.results.SubjectResultSheet;
import com.MiniProject.automate_results.entity.resultsCollection.ResultsCollection;
import com.MiniProject.automate_results.repository.ResultsCollectionRepository;
import com.MiniProject.automate_results.service.exception.RecordNotFoundException;
import com.MiniProject.automate_results.service.gpa.gpaserviceImpl.GPAServiceImpl;
import com.MiniProject.automate_results.service.results.resultsImpl.ManageResultsServiceImpl;
import com.MiniProject.automate_results.service.resultsCollection.ResultsCollectionService;
import com.MiniProject.automate_results.user.User;
import com.MiniProject.automate_results.user.UserRepository;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.Binary;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;


import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.util.*;
import java.util.stream.Collectors;
@Service
@Slf4j
public class ResultsCollectionServiceImpl implements ResultsCollectionService {

    private final ResultsCollectionRepository resultsCollectionRepository;
    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(ManageResultsServiceImpl.class);
    private final GPAServiceImpl gpaService;

    public ResultsCollectionServiceImpl(ResultsCollectionRepository resultsCollectionRepository, UserRepository userRepository, GPAServiceImpl gpaService) {
        this.resultsCollectionRepository = resultsCollectionRepository;
        this.userRepository = userRepository;
        this.gpaService = gpaService;
    }

    public Map<String, Map<String, String>> generateTable(ResultsCollection resultCollection) {
        Map<String, Map<String, String>> studentResultsTable = new HashMap<>();
        Map<String, Double> studentGPAMap = new HashMap<>(); // Create a map to store GPAs

        // Populate the student GPA map from the resultCollection
        for (StudentGPA studentGPA : resultCollection.getStudentGPAS()) {
            studentGPAMap.put(studentGPA.getIndex(), studentGPA.getGpa());
        }

        // Iterate over the subject result sheets to extract unique indexes
        for (SubjectResultSheet subjectResultSheet : resultCollection.getSubjectResultSheets()) {
            String subjectCode = subjectResultSheet.getSubjectCode();

            // Set to keep track of which student indices have been processed for the current subject
            Set<String> processedIndices = new HashSet<>();

            // Iterate over each student's result
            for (StudentResult studentResult : subjectResultSheet.getStudentResults()) {
                String studentIndex = studentResult.getIndex();
                String grade = studentResult.getGrade();

                // If the student index has already been processed for the current subject, skip it
                if (processedIndices.contains(studentIndex)) {
                    continue; // skip duplicate index
                }

                // Mark this index as processed for the current subject
                processedIndices.add(studentIndex);

                // If the index doesn't exist in the map, create a new map for the subject results
                studentResultsTable.computeIfAbsent(studentIndex, k -> new HashMap<>());

                // Fill in the grade for the current subject
                studentResultsTable.get(studentIndex).put(subjectCode, grade);
            }
        }

        // Fill missing subjects with "N/A"
        for (String index : studentResultsTable.keySet()) {
            for (SubjectResultSheet subjectResultSheet : resultCollection.getSubjectResultSheets()) {
                String subjectCode = subjectResultSheet.getSubjectCode();
                studentResultsTable.get(index).putIfAbsent(subjectCode, "-");
            }
        }

        // Add current GPA to each student's result
        for (String index : studentResultsTable.keySet()) {
            Double gpa = studentGPAMap.get(index);
            String gpaString = (gpa != null) ? String.valueOf(gpa) : "-"; // Use "N/A" if GPA is not found
            studentResultsTable.get(index).put("currentGPA", gpaString);
        }

        return studentResultsTable;
    }

    public Binary createPdf(Map<String, Map<String, String>> studentResultsTable, ResultsCollection resultCollection) throws Exception {
        // Create a byte array output stream to hold the PDF data
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

        // Initialize the PdfWriter with the byte array output stream
        PdfWriter writer = new PdfWriter(byteArrayOutputStream);

        // Initialize PDF document
        PdfDocument pdf = new PdfDocument(writer);

        // Initialize document with custom margins for better space management
        Document document = new Document(pdf);
        document.setMargins(10, 10, 10, 10); // Professional margins

        // Add university details (centered, reduced font size)
        Paragraph title = new Paragraph(resultCollection.getUniversity()).setTextAlignment(TextAlignment.CENTER).setBold();
        title.setFontSize(14); // Title font size 14
        document.add(title);

        document.add(new Paragraph(resultCollection.getFaculty()).setTextAlignment(TextAlignment.CENTER).setFontSize(12));
        document.add(new Paragraph(resultCollection.getDepartment()).setTextAlignment(TextAlignment.CENTER).setFontSize(12));
        document.add(new Paragraph(resultCollection.getDegreeProgram()).setTextAlignment(TextAlignment.CENTER).setFontSize(12));
        document.add(new Paragraph("Batch: " + resultCollection.getBatch()).setTextAlignment(TextAlignment.CENTER).setFontSize(12));
        document.add(new Paragraph("Semester: " + resultCollection.getSemester()).setTextAlignment(TextAlignment.CENTER).setFontSize(12));
        document.add(new Paragraph("Examination Held in: " + resultCollection.getSubjectResultSheets().get(0).getExaminationHeldMonth()).setTextAlignment(TextAlignment.CENTER).setFontSize(12));

        // Add a small space before the table
        document.add(new Paragraph("\n"));

        // Number of columns = subjects + 1 (for the index column)
        int numColumns = studentResultsTable.values().iterator().next().size(); // No currentGPA in table

        Table table = new Table(numColumns + 1); // Add 1 for current GPA column

        // Set table to fit the page width and adjust font size
        table.setWidth(UnitValue.createPercentValue(100)); // Table width set to 100%
        table.setFontSize(11); // Table content font size 11

        // Add headers (Index + Subject Codes + Current GPA)
        table.addCell(new Cell().add(new Paragraph("Index")).setFontSize(11));
        for (String subjectCode : studentResultsTable.values().iterator().next().keySet()) {
            if (!subjectCode.equals("currentGPA")) { // Exclude currentGPA from subject headers
                table.addCell(new Cell().add(new Paragraph(subjectCode)).setFontSize(11));
            }
        }
        table.addCell(new Cell().add(new Paragraph("Current GPA")).setFontSize(11)); // Add Current GPA header

        // Add student results
        for (String index : studentResultsTable.keySet()) {
            table.addCell(new Cell().add(new Paragraph(index)).setFontSize(11));
            for (String subjectCode : studentResultsTable.get(index).keySet()) {
                if (!subjectCode.equals("currentGPA")) { // Exclude currentGPA from subject results
                    table.addCell(new Cell().add(new Paragraph(studentResultsTable.get(index).get(subjectCode))).setFontSize(11));
                }
            }
            // Add the current GPA to the last cell of the row
            table.addCell(new Cell().add(new Paragraph(studentResultsTable.get(index).get("currentGPA"))).setFontSize(11));
        }

        // Add table to document
        document.add(table);

        // Avoid excessive spacing and add signatures with reduced font
        document.add(new Paragraph("\n"));

        // Signature table
        Table signatureTable = new Table(4); // 4 columns for the 4 signatures
        signatureTable.setWidth(UnitValue.createPercentValue(100)); // Set table width to 100%

        signatureTable.addCell(new Cell().add(new Paragraph("Prepared By")).setFontSize(12));
        signatureTable.addCell(new Cell().add(new Paragraph("Checked By")).setFontSize(12));
        signatureTable.addCell(new Cell().add(new Paragraph("Senior Assistant Registrar/Examinations")).setFontSize(12));
        signatureTable.addCell(new Cell().add(new Paragraph("Vice Chancellor")).setFontSize(12));

        // Add empty cells for signatures
        for (int i = 0; i < 4; i++) {
            signatureTable.addCell(new Cell().add(new Paragraph("\n\n\n\n"))); // Space for signatures
        }

        // Add signature table to the document
        document.add(signatureTable);

        // Add space before subjects section and reduce spacing between lines
        document.add(new Paragraph("\n"));

        // Add each unique subject to the PDF document with adjusted font size
        Set<String> subjectsNameAndCode = getUniqueSubjectDetails(resultCollection);
        for (String subject : subjectsNameAndCode) {
            document.add(new Paragraph(subject).setFontSize(12)); // Subject font size 12
        }

        // Close the document
        document.close();

        // Convert the byte array output stream to a Binary object
        byte[] pdfBytes = byteArrayOutputStream.toByteArray();
        return new Binary(pdfBytes);
    }

    public void saveResultsWithPdf(String id) throws Exception {

        Optional<ResultsCollection> resultCollections = resultsCollectionRepository.findById(id);
        if(resultCollections.isPresent()){
            ResultsCollection resultsCollections = resultCollections.get();
        // Generate the result table
        Map <String, Map<String, String>> resultTable = generateTable(resultsCollections);

        // Generate the PDF and get it as a Binary object
        Binary pdfContent = createPdf(resultTable,resultsCollections);

        // Save the PDF content in the resultsCollection entity
        resultsCollections.setPdfContent(pdfContent);

        // Save the updated resultsCollection back to the database
        resultsCollectionRepository.save(resultsCollections);

        }else{
            throw new RecordNotFoundException("The collection is not found");
        }
    }

    public Set<String> getUniqueSubjectDetails(ResultsCollection resultsCollection) {
        // Use a Set to ensure uniqueness
        Set<String> uniqueSubjects = new HashSet<>();

        // Loop through the subjectResultSheets list
        for (SubjectResultSheet subjectResultSheet : resultsCollection.getSubjectResultSheets()) {
            String subjectCode = subjectResultSheet.getSubjectCode();
            String subject = subjectResultSheet.getSubject();

            // Concatenate subjectCode and subject
            String subjectDetail = subjectCode + " - " + subject;

            // Add the combination to the Set (ensures uniqueness)
            uniqueSubjects.add(subjectDetail);
        }

        return uniqueSubjects; // Return the set of unique subject details
    }

    @Override
    public List<ResultsCollection> getPendingCollection(String id,Roles roles) throws RecordNotFoundException {
        switch (roles){
            case DEAN -> {
                Optional<User> user = userRepository.findById(id);
                if(user.isPresent()){
                    User user1 = user.get();
                    return resultsCollectionRepository.findByFacultyAndDeanNotApproved(user1.getFaculty().trim());
                }else{
                    throw new RecordNotFoundException("User not found.");
                }
            }
            case EXAMINATIONBRANCH -> {
                    return resultsCollectionRepository.findByDeanApproveStatusApprovedAndExaminationBranchNotApproved();
            }
            case REGISTRAR -> {
                return resultsCollectionRepository.findByExaminationBranchApprovedAndRegistrarNotApproved();
            }
            case VC -> {
                return resultsCollectionRepository. findByRegistrarApprovedStatusAndVcNotApproved();
            }
            default -> {
                throw new RecordNotFoundException("Role is invalid.");
            }
        }

    }

    @Override
    public ResultsCollection approval(String personalId,String sheetId, Roles roles) throws Exception {
            Optional<ResultsCollection> resultsCollection = resultsCollectionRepository.findById(sheetId);

            switch (roles){
                case DEAN -> {
                    if(resultsCollection.isPresent()){
                        ResultsCollection resultsCollection1 = resultsCollection.get();
                        resultsCollection1.setDeanId(personalId);
                        resultsCollection1.setDeanApproveStatus("APPROVED");
                        resultsCollectionRepository.save(resultsCollection1);
                        gpaService.getCollection(sheetId);
                        return  resultsCollection1;
                    }else{
                        throw new RuntimeException("Collection not found.");
                    }
                }
                case EXAMINATIONBRANCH -> {
                    if(resultsCollection.isPresent()){
                        ResultsCollection resultsCollection1 = resultsCollection.get();
                        resultsCollection1.setExaminationBranchId(personalId);
                        resultsCollection1.setExaminationBranchApproveStatus("APPROVED");
                        resultsCollectionRepository.save(resultsCollection1);
                        return  resultsCollection1;
                    }else{
                        throw new RuntimeException("Collection not found.");
                    }
                }
                case REGISTRAR -> {
                    if(resultsCollection.isPresent()){
                        ResultsCollection resultsCollection1 = resultsCollection.get();
                        resultsCollection1.setRegistrarId(personalId);
                        resultsCollection1.setRegistrarApprovedStatus("APPROVED");
                        resultsCollectionRepository.save(resultsCollection1);
                        return  resultsCollection1;
                    }else{
                        throw new RuntimeException("Collection not found.");
                    }
                }
                case VC -> {
                    if(resultsCollection.isPresent()){
                        ResultsCollection resultsCollection1 = resultsCollection.get();
                        resultsCollection1.setVCId(personalId);
                        resultsCollection1.setVcApprovedStatus("APPROVED");
                        resultsCollectionRepository.save(resultsCollection1);
                        saveResultsWithPdf(sheetId);
                        return  resultsCollection1;
                    }else{
                        throw new RuntimeException("Collection not found.");
                    }
                }
                default -> {
                    throw new RecordNotFoundException("Role is invalid.");
                }
            }

    }

    @Override
    public List<ResultsCollection> getApproveCollection(String id, Roles roles) throws RecordNotFoundException {
        switch (roles){
            case DEAN -> {
                return resultsCollectionRepository.findByDeanApproveStatusApproved();
            }
            case EXAMINATIONBRANCH -> {
                return resultsCollectionRepository.findByDeanExaminationBranchApproveStatus();
            }
            case REGISTRAR -> {
                return resultsCollectionRepository.findByRegistrarApprovedStatus();
            }
            case VC -> {
                    return resultsCollectionRepository.findByVcApprovedStatus();
            }
            default -> {
                throw new RecordNotFoundException("Role is invalid.");
            }
        }
    }

    @Override
    public List<ResultsCollection> getApproveCollectionForStudent() throws RecordNotFoundException {
        return resultsCollectionRepository.findByVcApprovedStatus();
    }

    @Override
    public List<RegisterRequest> getUsers() {
        List<User> users = userRepository.findByRoleNotAdmin();
        List<RegisterRequest>registerRequests = new ArrayList<>();
        for(User user : users){
            RegisterRequest registerRequest = RegisterRequest.builder()
                    .id(user.getId())
                    .fullName(user.getFullName())
                    .email(user.getEmail())
                    .faculty(user.getFaculty())
                    .department(user.getDepartment())
                    .employeeId(user.getEmployeeId())
                    .role(user.getRole())
                    .build();
            registerRequests.add(registerRequest);
        }

        return registerRequests;
    }

}
