package pl.edu.agh.api.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.api.data.MatchManagement;
import pl.edu.agh.api.services.MatchManagementService;

import java.util.UUID;


@RestController
@RequestMapping("/match")
public class MatchManagementController {

    @Autowired
    private MatchManagementService service;

    @PostMapping("/newMatch")
    public void addNewMatch() {
        // TODO:
        /**
         * Odbieramy:
         * - fighter 1
         * - fighter 2
         * - data
         * - czas
         * Zwracamy
         * - tokeny sędziów
         * - uniq id meczu (do bazy danych)
         *
         */
    }



}
