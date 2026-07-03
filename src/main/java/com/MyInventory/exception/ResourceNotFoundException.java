package com.myinventory.exception;

import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends BusinessException {

    public ResourceNotFoundException(String message) {

        super(
                message,
                HttpStatus.NOT_FOUND,
                ErrorCode.RESOURCE_NOT_FOUND
        );
    }
}