package pl.edu.agh.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.constants.RefereeType;
import pl.edu.agh.model.Match;
import pl.edu.agh.service.MatchManagementService;

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
    public ResponseEntity<Map<RefereeType, UUID>> addNewMatch(@RequestBody Match match) {
        return new ResponseEntity<>(matchManagementService.addNewMatch(match), HttpStatus.OK);
    }
}
