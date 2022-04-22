package pl.edu.agh.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    @ResponseBody
    public List<Fighter> getAllFighters() {
        return fighterQueryService.getAllFighters();
    }

    @PostMapping(value = "/register-fighter")
    @ResponseStatus(value = HttpStatus.OK)
    public void registerFighter(@RequestBody Fighter fighter) {
        fighterQueryService.registerFighter(fighter);
    }
}
