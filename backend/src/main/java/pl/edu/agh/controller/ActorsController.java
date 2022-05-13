package pl.edu.agh.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.model.Fighter;
import pl.edu.agh.service.FighterService;

import java.util.List;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/actors")
public class ActorsController {
    private final FighterService fighterService;

    @GetMapping("/fighters")
    public ResponseEntity<List<Fighter>> getAllFighters() {
        return new ResponseEntity<>(fighterService.getAllFighters(), HttpStatus.OK);
    }

    @PostMapping(value = "/register-fighter")
    public ResponseEntity<UUID> registerFighter(@RequestBody Fighter fighter) {
        fighterService.registerFighter(fighter);
        return new ResponseEntity<>(fighter.getId(), HttpStatus.OK);
    }

    @GetMapping("/fighters/id/{id}")
    public ResponseEntity<Fighter> getFighterById(@PathVariable String id) {

        UUID uuidId = UUID.fromString(id);

        return fighterService.fighterIdExists(uuidId) ?
                new ResponseEntity<>(fighterService.getFighterById(uuidId), HttpStatus.OK) :
                new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
