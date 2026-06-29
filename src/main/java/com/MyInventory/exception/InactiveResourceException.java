package com.myinventory.exception;

import org.springframework.http.HttpStatus;

public class InactiveResourceException extends BusinessException {

    public InactiveResourceException(String message) {

        super(
                message,
                HttpStatus.CONFLICT,
                ErrorCode.INACTIVE_RESOURCE
        );
    }
}