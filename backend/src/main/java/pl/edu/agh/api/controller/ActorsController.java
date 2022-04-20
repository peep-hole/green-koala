package pl.edu.agh.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.api.actors.Fighter;
import pl.edu.agh.api.services.FighterQueryService;

import java.util.List;

@RestController
@RequestMapping("/actors")
public class ActorsController {
    @Autowired
    private FighterQueryService fighterQueryService;

    @GetMapping("/fighters")
    public List<Fighter> getAllFighters() {
        return fighterQueryService.getAllFighters();
    }

    @PostMapping(value = "/register-fighter")
    public String registerFighter(@RequestBody Fighter fighter) {
        fighterQueryService.registerFighter(fighter);
        return "OK";
    }
}
