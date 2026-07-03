package com.myinventory.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "movements")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Movement extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(
            name = "user_id"
    )
    private User user;

    @ManyToOne
    @JoinColumn(
            name = "product_id"
    )
    private Product product;

    @Column(
            nullable = false
    )
    private Integer quantity;

    @Column(
            nullable = false
    )
    private Integer stockBefore;

    @Column(
            nullable = false
    )
    private Integer stockAfter;

    @Enumerated(EnumType.STRING)
    @Column(
            nullable = false
    )
    private MovementType type;

    @Column(
            length = 500
    )
    private String observation;
}