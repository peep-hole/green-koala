package pl.edu.agh.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.constants.Event;
import pl.edu.agh.model.Match;
import pl.edu.agh.service.MatchManagementService;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.UUID;


@RestController
@RequiredArgsConstructor
@RequestMapping("/matchWS")
public class MatchWSController {

    private final HashMap<UUID, Match> matches = new HashMap<>(); // TODO: maybe LinkedList is sufficient
    private final MatchManagementService matchManagementService;


    @PutMapping("/start-match/{id}")
    public ResponseEntity<Boolean> startMatch(@PathVariable String id) {

        UUID uuid = UUID.fromString(id);
        if (!matches.containsKey(uuid)) {
            matches.put(uuid, matchManagementService.getMatchById(uuid));
        }

        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @PutMapping("/update-points")
    public ResponseEntity<Boolean> updatePoints(@RequestBody Match points) {

        Match match = matches.get(points.getId());
        match.setFighter1Points(points.getFighter1Points());
        match.setFighter2Points(points.getFighter2Points());

        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @GetMapping("/events")
    public ResponseEntity<LinkedList<Event>> getEvents(@RequestBody Match match) {

        // TODO: query (from config json ???) event list

        return new ResponseEntity<>(new LinkedList<>(), HttpStatus.OK);
    }

    @PutMapping("finish/{id}")
    public ResponseEntity<Boolean> finishMatch(@PathVariable String id) {
        UUID uuid = UUID.fromString(id);

        if (!matches.containsKey(uuid)) {
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);
        }
        matchManagementService.updateMatch(matches.get(uuid));
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

}
