package com.myinventory.controller;

import com.myinventory.dto.CreateMovementRequest;
import com.myinventory.dto.MovementResponse;
import com.myinventory.service.MovementService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movements")
@PreAuthorize(
        "hasAnyRole('ADMIN','SUPERVISOR','EMPLOYEE')"
)
public class MovementController {

    private final MovementService movementService;

    public MovementController(
            MovementService movementService
    ) {

        this.movementService = movementService;
    }

    @PostMapping("/entry")
    @ResponseStatus(HttpStatus.CREATED)
    public MovementResponse registerEntry(
            @Valid @RequestBody CreateMovementRequest request
    ) {

        return movementService.registerEntry(request);
    }

    @PostMapping("/exit")
    @ResponseStatus(HttpStatus.CREATED)
    public MovementResponse registerExit(
            @Valid @RequestBody CreateMovementRequest request
    ) {

        return movementService.registerExit(request);
    }

    @GetMapping
    public List<MovementResponse> findAll() {

        return movementService.findAll();
    }
}