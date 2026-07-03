package com.myinventory.repository;

import com.myinventory.model.Movement;
import com.myinventory.model.MovementType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MovementRepository
        extends JpaRepository<Movement, Long> {

    long countByType(MovementType type);

    List<Movement> findAllByOrderByCreatedAtDesc();
}