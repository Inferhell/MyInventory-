package com.myinventory.exception;

import org.springframework.http.HttpStatus;

public class BusinessRuleException extends BusinessException {

    public BusinessRuleException(String message) {

        super(
                message,
                HttpStatus.CONFLICT,
                ErrorCode.BUSINESS_RULE_VIOLATION
        );
    }
}