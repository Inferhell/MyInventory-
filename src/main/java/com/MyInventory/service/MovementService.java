package com.myinventory.service;

import com.myinventory.dto.CreateMovementRequest;
import com.myinventory.dto.MovementResponse;

import java.util.List;


public interface MovementService {

    MovementResponse registerEntry(
            CreateMovementRequest request);

    MovementResponse registerExit(
            CreateMovementRequest request);

    List<MovementResponse> findAll();
}