package pl.edu.agh.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.api.actors.Fighter;
import pl.edu.agh.api.services.FighterService;

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
}
