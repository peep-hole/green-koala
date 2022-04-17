package pl.edu.agh.api.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.api.data.MatchManagement;
import pl.edu.agh.api.services.MatchManagementService;

import java.util.UUID;


@RestController
@RequestMapping("/api/match")
public class MatchManagementController {

    @Autowired
    private MatchManagementService service;

    @GetMapping("/uniqId")
    public UUID getUniqId() {
        return UUID.randomUUID(); // TODO: add logic here
    }

    @GetMapping("/id/{id}")
    public MatchManagement getById(@PathVariable String id) {
        return service.find(id);
    }

    @GetMapping("/referee/main/{id}")
    public String getSide1Token(@PathVariable String id){
        return "Main Token for " + id;
    }

    @GetMapping("/referee/side1/{id}")
    public String getSide2Token(@PathVariable String id){
        return "Side 1 Token for " + id;
    }

    @GetMapping("/referee/side2/{id}")
    public String getMainToken(@PathVariable String id){
        return "Side 2 Token for " + id;
    }

    @PostMapping
    public MatchManagement create(@RequestBody MatchManagement management) {
        return service.save(management);
    }

}
