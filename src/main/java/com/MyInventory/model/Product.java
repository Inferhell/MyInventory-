package com.myinventory.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "products")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(
            nullable = false
    )
    private String name;

    @Column(
            length = 300
    )
    private String description;

    @Column(
            nullable = false
    )
    private BigDecimal price;

    @Column(
            nullable = false
    )
    private Integer stock;

    @Builder.Default
    private boolean active = true;

    @ManyToOne
    @JoinColumn(
            name = "category_id"
    )
    private Category category;

    @ManyToOne
    @JoinColumn(
            name = "supplier_id"
    )
    private Supplier supplier;
}