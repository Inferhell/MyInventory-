package com.myinventory.controller;

import com.myinventory.dto.CreateMovementRequest;
import com.myinventory.dto.MovementResponse;
import com.myinventory.service.MovementService;

import jakarta.validation.Valid;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/movements")
@RequiredArgsConstructor
public class MovementController {

    private final MovementService movementService;

    @PreAuthorize("hasAuthority('MOVEMENT_CREATE')")
    @PostMapping("/entry")
    @ResponseStatus(HttpStatus.CREATED)
    public MovementResponse registerEntry(
            @Valid @RequestBody CreateMovementRequest request
    ) {

        return movementService.registerEntry(request);
    }

    @PreAuthorize("hasAuthority('MOVEMENT_CREATE')")
    @PostMapping("/exit")
    @ResponseStatus(HttpStatus.CREATED)
    public MovementResponse registerExit(
            @Valid @RequestBody CreateMovementRequest request
    ) {

        return movementService.registerExit(request);
    }

    @PreAuthorize("hasAuthority('MOVEMENT_READ')")
    @GetMapping
    public List<MovementResponse> findAll() {

        return movementService.findAll();
    }
}