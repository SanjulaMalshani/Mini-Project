package com.MiniProject.automate_results.service.exception;


import com.MiniProject.automate_results.dto.ErrorDTO;

public class DuplicateRecordException extends Exception{

    private final transient ErrorDTO errorDTO;

    public DuplicateRecordException(String message) {
        super(message);
        this.errorDTO = null;
    }

    public DuplicateRecordException(String message, ErrorDTO errorDTO) {
        super(message);
        this.errorDTO = errorDTO;
    }
}
