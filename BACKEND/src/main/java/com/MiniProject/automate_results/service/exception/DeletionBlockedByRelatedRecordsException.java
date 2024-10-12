package com.MiniProject.automate_results.service.exception;


import com.MiniProject.automate_results.dto.ErrorDTO;

public class DeletionBlockedByRelatedRecordsException extends Exception{

    private final transient ErrorDTO errorDTO;

    public DeletionBlockedByRelatedRecordsException(String message) {
        super(message);
        this.errorDTO = null;
    }

    public DeletionBlockedByRelatedRecordsException(String message, ErrorDTO errorDTO) {
        super(message);
        this.errorDTO = errorDTO;
    }
}
