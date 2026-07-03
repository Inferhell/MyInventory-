package com.myinventory.controller;

import com.myinventory.dto.DashboardResponse;
import com.myinventory.service.DashboardService;

import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @PreAuthorize("hasAuthority('DASHBOARD_READ')")
    @GetMapping
    public DashboardResponse getDashboard() {

        return dashboardService.getDashboard();
    }
}