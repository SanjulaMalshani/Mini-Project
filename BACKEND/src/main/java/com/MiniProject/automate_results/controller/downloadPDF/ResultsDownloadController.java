package com.MiniProject.automate_results.controller.downloadPDF;

import com.MiniProject.automate_results.entity.resultsCollection.ResultsCollection;
import com.MiniProject.automate_results.repository.ResultsCollectionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/results/downloadResultsPdf")
@CrossOrigin(origins = "*")
public class ResultsDownloadController {


    private final ResultsCollectionRepository resultsCollectionRepository;

    public ResultsDownloadController(ResultsCollectionRepository resultsCollectionRepository) {
        this.resultsCollectionRepository = resultsCollectionRepository;
    }

    /**
     * API endpoint to download the results PDF by collection ID
     *
     * @param id The ID of the ResultsCollection to fetch
     * @return ResponseEntity containing the PDF as byte[]
     */
    @GetMapping("/{id}")
    public ResponseEntity<byte[]> downloadResultsPdf(@PathVariable String id) {
        // Retrieve the ResultsCollection by ID
        Optional<ResultsCollection> resultsCollectionOptional = resultsCollectionRepository.findById(id);

        // If the ResultsCollection is found
        if (resultsCollectionOptional.isPresent()) {
            ResultsCollection resultsCollection = resultsCollectionOptional.get();

            // Get the PDF content as binary data
            if (resultsCollection.getPdfContent() != null) {
                byte[] pdfBytes = resultsCollection.getPdfContent().getData();

                // Set HTTP headers for file download
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_PDF);
                headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=results_" + id + ".pdf");

                // Return the PDF content as byte array in the response
                return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
            } else {
                // Handle the case where PDF content is not available
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // No PDF content available
            }
        } else {
            // Handle the case where ResultsCollection is not found
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Collection not found
        }
    }
}
