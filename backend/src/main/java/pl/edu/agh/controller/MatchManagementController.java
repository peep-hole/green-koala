package pl.edu.agh.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.constants.RefereeType;
import pl.edu.agh.model.DetailedMatch;
import pl.edu.agh.model.Match;
import pl.edu.agh.service.FighterService;
import pl.edu.agh.service.MatchManagementService;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;


@RestController
@RequiredArgsConstructor
@RequestMapping("/matches")
public class MatchManagementController {
    private final MatchManagementService matchManagementService;
    private final FighterService fighterService;

    @GetMapping("/all")
    public ResponseEntity<List<Match>> getMatches() {
        return new ResponseEntity<>(matchManagementService.getAllMatches(), HttpStatus.OK);
    }

    @GetMapping("/all/detailed")
    public ResponseEntity<List<DetailedMatch>> getMatchesWithDetails() {
        List<DetailedMatch> detailedMatches = matchManagementService.getAllMatches().stream().map(
                match -> new DetailedMatch(
                        match.getId(),
                        fighterService.getFighterById(match.getFighterId1()).getName() + " " + fighterService.getFighterById(match.getFighterId1()).getSurname(),
                        fighterService.getFighterById(match.getFighterId2()).getName() + " " + fighterService.getFighterById(match.getFighterId2()).getSurname(),
                        match.getDate(),
                        match.getTime(), match.isFinished())).collect(Collectors.toList());
        return new ResponseEntity<>(detailedMatches, HttpStatus.OK);
    }

    // TODO: consider creating new class to return data here
    @PostMapping("/new-match")
    public ResponseEntity<Map<RefereeType, UUID>> addNewMatch(@RequestBody Match match) {
        return new ResponseEntity<>(matchManagementService.addNewMatch(match), HttpStatus.OK);
    }

    @GetMapping("/token/{token}")
    public ResponseEntity<Match> getMatchByRefereeToken(@PathVariable String token) {
        UUID uuidToken = UUID.fromString(token);

        List<Match> matches = matchManagementService.getAllMatches();

        for (Match match : matches) {
            if (match.getMainRefereeToken().equals(uuidToken) ||
                    match.getSideRefereeToken1().equals(uuidToken) ||
                    match.getSideRefereeToken2().equals(uuidToken)) {

                return new ResponseEntity<>(match, HttpStatus.OK);
            }
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/id/{id}")
    public ResponseEntity<Match> getMatchById(@PathVariable String id) {
        UUID uuidId = UUID.fromString(id);

        return matchManagementService.matchIdExists(uuidId) ?
                new ResponseEntity<>(matchManagementService.getMatchById(uuidId), HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/cancel/{id}")
    public ResponseEntity<Boolean> cancelMatch(@PathVariable String id) {
        UUID uuidId = UUID.fromString(id);

        if (matchManagementService.matchIdExists(uuidId)) {
            matchManagementService.deleteMatch(uuidId);
            return new ResponseEntity<>(true, HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
