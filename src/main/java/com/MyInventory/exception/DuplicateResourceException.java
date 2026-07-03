package com.myinventory.exception;

import org.springframework.http.HttpStatus;

public class DuplicateResourceException extends BusinessException {

    public DuplicateResourceException(String message) {

        super(
                message,
                HttpStatus.CONFLICT,
                ErrorCode.DUPLICATE_RESOURCE
        );
    }
}