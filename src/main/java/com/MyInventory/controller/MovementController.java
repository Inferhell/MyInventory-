package com.myinventory.controller;

import com.myinventory.dto.CreateMovementRequest;
import com.myinventory.model.Movement;
import com.myinventory.service.MovementService;
import org.springframework.web.bind.annotation.*;
import com.myinventory.dto.MovementResponse;

import java.util.List;

@RestController
@RequestMapping("/movements")
public class MovementController {

    private final MovementService movementService;

    public MovementController(
            MovementService movementService) {

        this.movementService = movementService;
    }

    @PostMapping("/entry")
public MovementResponse registerEntry(
        @RequestBody CreateMovementRequest request) {

    return movementService.registerEntry(request);
}

@PostMapping("/exit")
public MovementResponse registerExit(
        @RequestBody CreateMovementRequest request) {

    return movementService.registerExit(request);
}

@GetMapping
public List<MovementResponse> findAll() {

    return movementService.findAll();
}
}