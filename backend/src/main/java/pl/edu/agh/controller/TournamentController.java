package pl.edu.agh.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.model.Tournament;
import pl.edu.agh.model.TournamentRules;
import pl.edu.agh.service.TournamentRulesService;
import pl.edu.agh.service.TournamentService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/tournaments")
public class TournamentController {
    private final TournamentService tournamentService;
    private final TournamentRulesService rulesService;

    @PostMapping("/new-tournament")
    public ResponseEntity<Long> addNewTournament(@RequestBody Tournament tournament) {
        tournamentService.add(tournament);
        return new ResponseEntity<>(tournament.getId(), HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteTournament(@PathVariable String id) {
        Long idLong = Long.valueOf(id);
        Long idRules = tournamentService.getById(idLong).getRulesId();
        tournamentService.remove(idLong);
        rulesService.remove(idRules);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/get-all")
    public ResponseEntity<List<Tournament>> deleteNewTournament() {
        return new ResponseEntity<>(tournamentService.getAll(), HttpStatus.OK);
    }

    @PostMapping("/add-rules/{tournament_id}")
    public ResponseEntity<Void> addRules(@PathVariable String tournament_id, @RequestBody TournamentRules rules) {
        rulesService.add(rules);
        Tournament tournament = tournamentService.getById(Long.valueOf(tournament_id));
        tournament.setRulesId(rules.getId());
        tournamentService.add(tournament);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/get-rules/{tournament_id}")
    public ResponseEntity<TournamentRules> getRules(@PathVariable String tournament_id) {
        Tournament tournament = tournamentService.getById(Long.valueOf(tournament_id));
        return new ResponseEntity<>(rulesService.getById(tournament.getRulesId()), HttpStatus.OK);
    }
}
