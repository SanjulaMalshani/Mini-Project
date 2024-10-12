package com.MiniProject.automate_results.service.exception;


import com.MiniProject.automate_results.dto.ErrorDTO;

public class CustomInternalServerException extends RuntimeException{

    private final transient ErrorDTO errorDTO;

    public CustomInternalServerException(String message) {
        super(message);
        this.errorDTO = null;
    }

    public CustomInternalServerException(String message, ErrorDTO errorDTO) {
        super(message);
        this.errorDTO = errorDTO;
    }
}
