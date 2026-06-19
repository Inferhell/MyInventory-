package com.myinventory.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class RoleTestController {

    @GetMapping("/admin")
    public String admin() {
        return "Admin Area";
    }

    @GetMapping("/supervisor")
    public String supervisor() {
        return "Supervisor Area";
    }

    @GetMapping("/employee")
    public String employee() {
        return "Employee Area";
    }
    
}

