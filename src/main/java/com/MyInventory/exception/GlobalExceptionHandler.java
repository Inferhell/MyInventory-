package com.myinventory.exception;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(BusinessException.class)
    public ProblemDetail handleBusinessException(
            BusinessException exception,
            HttpServletRequest request
    ) {

        ProblemDetail problemDetail =
                ProblemDetail.forStatusAndDetail(
                        exception.getStatus(),
                        exception.getMessage()
                );

        problemDetail.setTitle(
                getTitle(exception.getCode())
        );

        problemDetail.setProperty(
                "code",
                exception.getCode().name()
        );

        problemDetail.setProperty(
                "path",
                request.getRequestURI()
        );

        problemDetail.setProperty(
                "timestamp",
                Instant.now().toString()
        );

        return problemDetail;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ProblemDetail handleValidationException(
            MethodArgumentNotValidException exception,
            HttpServletRequest request
    ) {

        ProblemDetail problemDetail =
                ProblemDetail.forStatusAndDetail(
                        HttpStatus.BAD_REQUEST,
                        "La solicitud contiene campos inválidos"
                );

        Map<String, String> fieldErrors =
                new HashMap<>();

        exception.getBindingResult()
                .getFieldErrors()
                .forEach(error ->
                        fieldErrors.put(
                                error.getField(),
                                error.getDefaultMessage()
                        )
                );

        problemDetail.setTitle(
                "Error de validación"
        );

        problemDetail.setProperty(
                "code",
                ErrorCode.VALIDATION_ERROR.name()
        );

        problemDetail.setProperty(
                "fields",
                fieldErrors
        );

        problemDetail.setProperty(
                "path",
                request.getRequestURI()
        );

        problemDetail.setProperty(
                "timestamp",
                Instant.now().toString()
        );

        return problemDetail;
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ProblemDetail handleAccessDeniedException(
            AccessDeniedException exception,
            HttpServletRequest request
    ) {

        ProblemDetail problemDetail =
                ProblemDetail.forStatusAndDetail(
                        HttpStatus.FORBIDDEN,
                        "No tienes permisos para realizar esta acción"
                );

        problemDetail.setTitle(
                "Acceso denegado"
        );

        problemDetail.setProperty(
                "code",
                ErrorCode.ACCESS_DENIED.name()
        );

        problemDetail.setProperty(
                "path",
                request.getRequestURI()
        );

        problemDetail.setProperty(
                "timestamp",
                Instant.now().toString()
        );

        return problemDetail;
    }

    @ExceptionHandler(AuthenticationException.class)
    public ProblemDetail handleAuthenticationException(
            AuthenticationException exception,
            HttpServletRequest request
    ) {

        ProblemDetail problemDetail =
                ProblemDetail.forStatusAndDetail(
                        HttpStatus.UNAUTHORIZED,
                        "Debes iniciar sesión para acceder a este recurso"
                );

        problemDetail.setTitle(
                "No autenticado"
        );

        problemDetail.setProperty(
                "code",
                ErrorCode.AUTHENTICATION_ERROR.name()
        );

        problemDetail.setProperty(
                "path",
                request.getRequestURI()
        );

        problemDetail.setProperty(
                "timestamp",
                Instant.now().toString()
        );

        return problemDetail;
    }

    @ExceptionHandler(RuntimeException.class)
    public ProblemDetail handleRuntimeException(
            RuntimeException exception,
            HttpServletRequest request
    ) {

        ProblemDetail problemDetail =
                ProblemDetail.forStatusAndDetail(
                        HttpStatus.BAD_REQUEST,
                        exception.getMessage()
                );

        problemDetail.setTitle(
                "Error de negocio"
        );

        problemDetail.setProperty(
                "code",
                ErrorCode.BUSINESS_RULE_VIOLATION.name()
        );

        problemDetail.setProperty(
                "path",
                request.getRequestURI()
        );

        problemDetail.setProperty(
                "timestamp",
                Instant.now().toString()
        );

        return problemDetail;
    }

    @ExceptionHandler(Exception.class)
    public ProblemDetail handleGenericException(
            Exception exception,
            HttpServletRequest request
    ) {

        ProblemDetail problemDetail =
                ProblemDetail.forStatusAndDetail(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        "Ocurrió un error inesperado"
                );

        problemDetail.setTitle(
                "Error interno"
        );

        problemDetail.setProperty(
                "code",
                ErrorCode.INTERNAL_ERROR.name()
        );

        problemDetail.setProperty(
                "path",
                request.getRequestURI()
        );

        problemDetail.setProperty(
                "timestamp",
                Instant.now().toString()
        );

        return problemDetail;
    }

    private String getTitle(ErrorCode code) {

        return switch (code) {

            case RESOURCE_NOT_FOUND ->
                    "Recurso no encontrado";

            case DUPLICATE_RESOURCE ->
                    "Recurso duplicado";

            case INACTIVE_RESOURCE ->
                    "Recurso inactivo";

            case INSUFFICIENT_STOCK ->
                    "Stock insuficiente";

            case BUSINESS_RULE_VIOLATION ->
                    "Regla de negocio incumplida";

            case VALIDATION_ERROR ->
                    "Error de validación";

            case ACCESS_DENIED ->
                    "Acceso denegado";

            case AUTHENTICATION_ERROR ->
                    "No autenticado";

            case INTERNAL_ERROR ->
                    "Error interno";
        };
    }
}