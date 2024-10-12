package com.MiniProject.automate_results.service.results.resultsImpl;

import com.MiniProject.automate_results.dto.Roles;
import com.MiniProject.automate_results.dto.resluts.DepSecretarySubjectResultSheetDto;
import com.MiniProject.automate_results.dto.resluts.LectureSubjectResultSheetDto;
import com.MiniProject.automate_results.dto.resluts.RejectedDetailsDTO;
import com.MiniProject.automate_results.dto.resluts.StudentMedicalAndAbsentDto;
import com.MiniProject.automate_results.entity.results.StudentMedicalAndAbsent;
import com.MiniProject.automate_results.entity.results.SubjectResultSheet;
import com.MiniProject.automate_results.entity.resultsCollection.ResultsCollection;
import com.MiniProject.automate_results.repository.ResultSheetRepository;
import com.MiniProject.automate_results.repository.ResultsCollectionRepository;
import com.MiniProject.automate_results.service.exception.DuplicateRecordException;
import com.MiniProject.automate_results.service.exception.RecordNotFoundException;
import com.MiniProject.automate_results.service.results.ManageResultsService;
import com.MiniProject.automate_results.user.Role;
import com.MiniProject.automate_results.user.User;
import com.MiniProject.automate_results.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.aggregation.ConditionalOperators;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@Slf4j
public class ManageResultsServiceImpl implements ManageResultsService {
    private final ModelMapper modelMapper;
    private final ResultsCollectionRepository resultsCollectionRepository;
    private final ResultSheetRepository resultSheetRepository;
    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(ManageResultsServiceImpl.class);

    public ManageResultsServiceImpl(ModelMapper modelMapper, ResultsCollectionRepository resultsCollectionRepository, ResultSheetRepository resultSheetRepository, UserRepository userRepository) {
        this.modelMapper = modelMapper;
        this.resultsCollectionRepository = resultsCollectionRepository;
        this.resultSheetRepository = resultSheetRepository;
        this.userRepository = userRepository;
    }

    @Override
    public SubjectResultSheet createAndUpdateResults(String id, String lecId, LectureSubjectResultSheetDto lectureSubjectResultSheetDto) throws RecordNotFoundException, DuplicateRecordException {
        logger.info("Creating or updating results for ID: {}", id);

        if (id == null) {

            // Ensure to trim the parameters before checking
            List<SubjectResultSheet> results = resultSheetRepository.findByParameters(
                    lectureSubjectResultSheetDto.getUniversity().trim(),
                    lectureSubjectResultSheetDto.getFaculty().trim(),
                    lectureSubjectResultSheetDto.getDepartment().trim(),
                    lectureSubjectResultSheetDto.getDegreeProgram().trim(),
                    lectureSubjectResultSheetDto.getSemester().trim(),
                    lectureSubjectResultSheetDto.getBatch().trim(),
                    lectureSubjectResultSheetDto.getSubject().trim(),
                    lectureSubjectResultSheetDto.getSubjectCode().trim());

            if (!results.isEmpty()) {
                throw new DuplicateRecordException("This Subject results already exist");
            }


            SubjectResultSheet subjectResultSheet = modelMapper.map(lectureSubjectResultSheetDto, SubjectResultSheet.class);
            subjectResultSheet.setCurrentStep("FROM LECTURE TO SECRETARY");

            // Add lectureName by using ID
            Optional<User> user = userRepository.findById(lectureSubjectResultSheetDto.getLectureID());
            if (user.isPresent()) {
                User user1 = user.get();
                String lectureName = user1.getFullName();
                subjectResultSheet.setLectureName(lectureName);
            } else {
                throw new RecordNotFoundException("Lecture not found");
            }
            resultSheetRepository.save(subjectResultSheet);
            logger.info("Created new SubjectResultSheet with ID: {}", subjectResultSheet.getId());

            return subjectResultSheet;
        } else {
            Optional<SubjectResultSheet> subjectResultSheetOpt = resultSheetRepository.findById(id);
            if (subjectResultSheetOpt.isPresent()) {
                SubjectResultSheet subjectResultSheet1 = subjectResultSheetOpt.get();
                System.out.println(lectureSubjectResultSheetDto);
                if (Objects.equals(subjectResultSheet1.getLectureID(), lecId)) {
                    modelMapper.map(lectureSubjectResultSheetDto, subjectResultSheet1);
                    subjectResultSheet1.setStudentResults(lectureSubjectResultSheetDto.getStudentResults());
                    resultSheetRepository.save(subjectResultSheet1);
                    logger.info("Updated SubjectResultSheet with ID: {}", subjectResultSheet1.getId());
                    return subjectResultSheet1;
                } else {
                    throw new RecordNotFoundException("This lecture did not create this sheet.");
                }
            } else {
                logger.error("Result not found for ID: {}", id);
                throw new RecordNotFoundException("Result Not Found");
            }
        }
    }

    public SubjectResultSheet UpdateRejectedResults(String id, String personId, LectureSubjectResultSheetDto lectureSubjectResultSheetDto, Role role) throws RecordNotFoundException {
        Optional<SubjectResultSheet> subjectResultSheetOpt = resultSheetRepository.findById(id);
        SubjectResultSheet subjectResultSheet1;
        if (subjectResultSheetOpt.isPresent()) {
             subjectResultSheet1 = subjectResultSheetOpt.get();
    } else{
        logger.error("Result not found for ID: {}", id);
        throw new RecordNotFoundException("Result Not Found");
    }

        switch (role){
            case Role.LECTURE -> {
                if (Objects.equals(subjectResultSheet1.getLectureID(), personId)) {
                    subjectResultSheet1.setRejectMessage(lectureSubjectResultSheetDto.getRejectMessage());
                    subjectResultSheet1.setRejectStatus("lecture");
                    subjectResultSheet1.setStudentResults(lectureSubjectResultSheetDto.getStudentResults());
                    resultSheetRepository.save(subjectResultSheet1);
                    return subjectResultSheet1;
                } else {
                    throw new RecordNotFoundException("This lecture did not create this sheet.");
                }
            }
            case SECRETARY -> {
                    subjectResultSheet1.setRejectStatus("dptSecretary");
                    subjectResultSheet1.setDepSecretaryStatus("APPROVED");
                    subjectResultSheet1.setStudentResults(lectureSubjectResultSheetDto.getStudentResults());
                    resultSheetRepository.save(subjectResultSheet1);

                    return subjectResultSheet1;
            }
            default -> {
                throw new RecordNotFoundException("Role not Found.");
            }
        }
    }

    @Override
    public SubjectResultSheet UpdateResultsBySec(String id, String lecId, LectureSubjectResultSheetDto lectureSubjectResultSheetDto) throws RecordNotFoundException {
        Optional<SubjectResultSheet> subjectResultSheetOpt = resultSheetRepository.findById(id);
        if (subjectResultSheetOpt.isPresent()) {
            SubjectResultSheet subjectResultSheet1 = subjectResultSheetOpt.get();

                modelMapper.map(lectureSubjectResultSheetDto, subjectResultSheet1);
                subjectResultSheet1.setStudentResults(lectureSubjectResultSheetDto.getStudentResults());
                resultSheetRepository.save(subjectResultSheet1);
                return subjectResultSheet1;

        } else {
            logger.error("Result not found for ID: {}", id);
            throw new RecordNotFoundException("Result Not Found");
        }
    }

    @Override
    public SubjectResultSheet UpdateStudentsResultsByDepSecretary(String sheetId, DepSecretarySubjectResultSheetDto depSecretarySubjectResultSheetDto) throws RecordNotFoundException {
        logger.info("Updating student results for sheet ID: {}", sheetId);

        Optional<SubjectResultSheet> subjectResultSheetOpt = resultSheetRepository.findById(sheetId);
        if (subjectResultSheetOpt.isPresent()) {

            SubjectResultSheet subjectResultSheet1 = subjectResultSheetOpt.get();
            modelMapper.map(depSecretarySubjectResultSheetDto, subjectResultSheet1);
            subjectResultSheet1.setStudentResults(depSecretarySubjectResultSheetDto.getStudentResults());
            subjectResultSheet1.setDepSecretaryID(depSecretarySubjectResultSheetDto.getDepSecretaryID());
            subjectResultSheet1.setDepSecretaryStatus("APPROVED");
            subjectResultSheet1.setCurrentStep("FROM SECRETARY TO LECTURE");
            resultSheetRepository.save(subjectResultSheet1);

            logger.info("Updated SubjectResultSheet with ID: {}", subjectResultSheet1.getId());
            return subjectResultSheet1;
        } else {
            logger.error("Result not found for sheet ID: {}", sheetId);
            throw new RecordNotFoundException("Result Not Found");
        }
    }

    @Override
    public List<SubjectResultSheet> getPendingSheet(String id) throws RecordNotFoundException {
        List<SubjectResultSheet> subjectResultSheets = resultSheetRepository.findByDepSecretaryStatusNotApprovedAndLecId(id);

        if(subjectResultSheets.isEmpty()){
            throw new RecordNotFoundException("Results Not Found");
        }

        return subjectResultSheets;
    }

    @Override
    public List<SubjectResultSheet> getApprovedSheet(Roles person, String id) throws RecordNotFoundException {

        switch (person) {
            case Roles.LECTURE -> {
                return resultSheetRepository.findByDepSecretaryStatusApprovedAndLectureNotApprovedAndLecId(id);
            }
            case SECRETARY -> {
                List<SubjectResultSheet> subjectResultSheets = resultSheetRepository.findByDepSecretaryStatusNotApprovedOrRejectStatusLecture();
                Optional<User> userOptional = userRepository.findById(id);

                if (userOptional.isPresent()) {
                    User user1 = userOptional.get();
                    List<SubjectResultSheet> filteredSubjectResultSheets = new ArrayList<>(); // New list to hold filtered results

                    for (SubjectResultSheet subjectResultSheet : subjectResultSheets) {
                        // Check if the department matches
                        if (subjectResultSheet.getDepartment().equalsIgnoreCase(user1.getDepartment().trim())) {
                            filteredSubjectResultSheets.add(subjectResultSheet); // Add to the new list
                        }
                    }
                    // Check if the filtered list is empty
                    if (filteredSubjectResultSheets.isEmpty()) {
                        throw new RecordNotFoundException("There are no sheets for the user's department");
                    } else {
                        return filteredSubjectResultSheets; // Return filtered results
                    }
                } else {
                    throw new RecordNotFoundException("User not found");
                }
            }

            case Roles.HOD -> {
                List<SubjectResultSheet> subjectResultSheets = resultSheetRepository.findByLecturerApprovalStatusApprovedAndHodNotApproved();
                Optional<User> user = userRepository.findById(id);
                if (user.isPresent()) {
                    User user1 = user.get();
                    List<SubjectResultSheet> filteredSubjectResultSheets = new ArrayList<>(); // New list to hold filtered results
                    for (SubjectResultSheet subjectResultSheet : subjectResultSheets) {
                        if (subjectResultSheet.getDepartment().equalsIgnoreCase(user1.getDepartment())) {
                            filteredSubjectResultSheets.add(subjectResultSheet);
                        }
                    }
                    if (filteredSubjectResultSheets.isEmpty()) {
                        throw new RecordNotFoundException("There is no any sheets");
                    } else {
                        return filteredSubjectResultSheets;
                    }

                } else {
                    throw new RecordNotFoundException("User not found");
                }

            }
            case Roles.DEAN -> {
                List<SubjectResultSheet> subjectResultSheets = resultSheetRepository.findByHodApprovalStatusApprovedAndDeanNotApproved();
                Optional<User> user = userRepository.findById(id);
                if (user.isPresent()) {
                    User user1 = user.get();
                    List<SubjectResultSheet> filteredSubjectResultSheets = new ArrayList<>(); // New list to hold filtered results
                    for (SubjectResultSheet subjectResultSheet : subjectResultSheets) {
                        if (subjectResultSheet.getFaculty().equalsIgnoreCase(user1.getFaculty())) {
                            filteredSubjectResultSheets.add(subjectResultSheet);
                        }
                    }
                    if (filteredSubjectResultSheets.isEmpty()) {
                        throw new RecordNotFoundException("There is no any sheets");
                    } else {
                        return filteredSubjectResultSheets;
                    }

                } else {
                    throw new RecordNotFoundException("User not found");
                }

            }
            default -> {
                throw new RecordNotFoundException("Results Not Found");
            }
        }

    }


    @Override
    @Transactional
    public SubjectResultSheet addApproval(String personId, String sheetId, Roles person,LectureSubjectResultSheetDto lectureSubjectResultSheetDto) throws RecordNotFoundException {
        Optional<SubjectResultSheet> subjectResultSheetOpt = resultSheetRepository.findById(sheetId);
        SubjectResultSheet subjectResultSheet;
        if (subjectResultSheetOpt.isPresent()) {
            subjectResultSheet = subjectResultSheetOpt.get();
        }else{
            throw new RecordNotFoundException("Result Not Found");
        }
        switch (person){
            case Roles.LECTURE -> {
                if(Objects.equals(subjectResultSheet.getLectureID(), personId) && Objects.equals(subjectResultSheet.getDepSecretaryStatus(), "APPROVED")){
                    subjectResultSheet.setLecturerApprovalStatus("APPROVED");
                    subjectResultSheet.setCurrentStep("HEAD OF DEPARTMENT");
                    subjectResultSheet.setRejectStatus("");
                    subjectResultSheet.setStudentResults(lectureSubjectResultSheetDto.getStudentResults());
                    subjectResultSheet.setRejectMessage("");
                    resultSheetRepository.save(subjectResultSheet);
                    return subjectResultSheet;
                }else{
                    throw new RecordNotFoundException("The lecturer should be the one who creates the result sheet. OR Department secretary is not approved");
                }
            }
            case Roles.HOD -> {
                if(Objects.equals(subjectResultSheet.getLecturerApprovalStatus(), "APPROVED")){
                    //personal ID validation should do according tp department
                    subjectResultSheet.setHodApprovalStatus("APPROVED");
                    subjectResultSheet.setCurrentStep("FACULTY DEAN");
                    subjectResultSheet.setHodID(personId);
                    resultSheetRepository.save(subjectResultSheet);
                    return subjectResultSheet;
                }else{
                    throw new RecordNotFoundException("The lecturer is not approved");
                }
            }
            case Roles.DEAN -> {
                return saveResultSheetAndCollection(subjectResultSheet,personId);
            }
            default -> {
                throw new RecordNotFoundException("Role Not Found");
            }
        }
    }

    @Transactional
    public SubjectResultSheet saveResultSheetAndCollection(SubjectResultSheet subjectResultSheet, String personId) throws RecordNotFoundException {
        System.out.println(subjectResultSheet);
        if (subjectResultSheet.getHodApprovalStatus().equals("APPROVED")){

            // Personal ID validation should do according to department
            subjectResultSheet.setDeanApproved("APPROVED");
            subjectResultSheet.setCurrentStep("ADD TO COLLECTION");
            subjectResultSheet.setDeanID(personId);

            // Save the subject result sheet
            resultSheetRepository.save(subjectResultSheet);

            // Find existing results collection
            Optional<ResultsCollection> resultsCollection = resultsCollectionRepository.findByParameters(
                    subjectResultSheet.getUniversity().trim(),
                    subjectResultSheet.getFaculty().trim(),
                    subjectResultSheet.getDepartment().trim(),
                    subjectResultSheet.getDegreeProgram().trim(),
                    subjectResultSheet.getSemester().trim(),
                    subjectResultSheet.getBatch().trim()
            );

            // If collection exists, update it
            if (resultsCollection.isPresent())  {
                ResultsCollection resultsCollection1 = resultsCollection.get();
                resultsCollection1.getSubjectResultSheets().add(subjectResultSheet);
                resultsCollection1.setNoOfResults(resultsCollection1.getSubjectResultSheets().size());
                resultsCollectionRepository.save(resultsCollection1);
            } else {
                // If collection does not exist, create a new one
                List<SubjectResultSheet> subjectResultSheets = new ArrayList<>();
                subjectResultSheets.add(subjectResultSheet);

                ResultsCollection resultsCollection1 = ResultsCollection.builder()
                        .batch(subjectResultSheet.getBatch())
                        .degreeProgram(subjectResultSheet.getDegreeProgram())
                        .faculty(subjectResultSheet.getFaculty())
                        .semester(subjectResultSheet.getSemester())
                        .university(subjectResultSheet.getUniversity())
                        .department(subjectResultSheet.getDepartment())
                        .NoOfResults(subjectResultSheets.size())
                        .subjectResultSheets(subjectResultSheets)
                        .build();

                resultsCollectionRepository.save(resultsCollection1);
            }

            return subjectResultSheet;
        } else {
            throw new RecordNotFoundException("The Head of Department is not approved");
        }
    }

    @Override
    public List<SubjectResultSheet> getAllApprovedSheets(Roles role, String id) throws RecordNotFoundException {
        switch (role){
            case Roles.SECRETARY -> {
                return resultSheetRepository.findByDepSecretaryStatusApprovedAndDepSecretaryId(id);
            }
            case Roles.LECTURE -> {
                return resultSheetRepository.findByLecturerStatusApprovedAndLecturerId(id);
            }
            case Roles.HOD -> {
                return resultSheetRepository.findByHodStatusApprovedAndHodId(id);
            }
            case Roles.DEAN -> {
                return resultSheetRepository.findByDeanStatusApprovedAndDeanId(id);
            }
            default -> {
                throw new RecordNotFoundException("Role is not correct.");
            }
        }
    }
}
