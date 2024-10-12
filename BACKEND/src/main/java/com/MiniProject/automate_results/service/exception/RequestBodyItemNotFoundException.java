package com.MiniProject.automate_results.service.exception;


import com.MiniProject.automate_results.dto.ErrorDTO;

public class RequestBodyItemNotFoundException extends Exception{
    private final transient ErrorDTO errorDTO;

    public RequestBodyItemNotFoundException(String message) {
        super(message);
        this.errorDTO = null;
    }

    public RequestBodyItemNotFoundException(String message, ErrorDTO errorDTO) {
        super(message);
        this.errorDTO = errorDTO;
    }
}
