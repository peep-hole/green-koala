package pl.edu.agh.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.model.Tournament;
import pl.edu.agh.service.TournamentService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/tournaments")
public class TournamentController {
    private final TournamentService tournamentService;

    @PostMapping("/new-tournament")
    public ResponseEntity<Void> addNewTournament(@RequestBody Tournament tournament) {
        tournamentService.add(tournament);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteNewTournament(@PathVariable String id) {
        Long idLong = Long.valueOf(id);
        tournamentService.remove(idLong);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<Tournament>> deleteNewTournament() {
        return new ResponseEntity<>(tournamentService.getAll(), HttpStatus.OK);
    }
}
