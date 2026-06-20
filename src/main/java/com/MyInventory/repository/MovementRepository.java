package com.myinventory.repository;

import com.myinventory.model.Movement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MovementRepository
        extends JpaRepository<Movement, Long> {

    long countByType(com.myinventory.model.MovementType type);
}