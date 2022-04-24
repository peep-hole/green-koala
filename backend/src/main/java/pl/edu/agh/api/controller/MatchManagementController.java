package pl.edu.agh.api.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.api.actors.Referee;
import pl.edu.agh.api.model.Match;
import pl.edu.agh.api.services.MatchManagementService;

import java.util.List;
import java.util.Map;
import java.util.UUID;


@RestController
@RequiredArgsConstructor
@RequestMapping("/matches")
public class MatchManagementController {
    private final MatchManagementService matchManagementService;

    @GetMapping("/all")
    public ResponseEntity<List<Match>> getMatches() {
        return new ResponseEntity<>(matchManagementService.getAllMatches(), HttpStatus.OK);
    }

    // TODO: consider creating new class to return data here
    @PostMapping("/new-match")
    public ResponseEntity<Map<Referee, UUID>> addNewMatch(@RequestBody Match match) {
        return new ResponseEntity<>(matchManagementService.addNewMatch(match), HttpStatus.OK);
    }
}
