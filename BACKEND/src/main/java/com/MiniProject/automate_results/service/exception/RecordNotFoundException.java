package com.MiniProject.automate_results.service.exception;


import com.MiniProject.automate_results.dto.ErrorDTO;
import lombok.Getter;

@Getter
public class RecordNotFoundException extends Exception{

    private final transient ErrorDTO errorDTO;

    public RecordNotFoundException(String message) {
        super(message);
        this.errorDTO = null;
    }

    public RecordNotFoundException(String message, ErrorDTO errorDTO) {
        super(message);
        this.errorDTO = errorDTO;
    }
}
