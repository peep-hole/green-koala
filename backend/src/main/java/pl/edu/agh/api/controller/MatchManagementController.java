package pl.edu.agh.api.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.api.actors.Referee;
import pl.edu.agh.api.model.Match;
import pl.edu.agh.api.services.MatchManagementService;

import java.util.List;
import java.util.Map;
import java.util.UUID;


@RestController
@RequestMapping("/matches")
public class MatchManagementController {
    // TODO: generating random UUID as match id / fighter id -> backend/frontend?

    @Autowired
    private MatchManagementService matchManagementService;

    @GetMapping("/all")
    @ResponseBody
    public List<Match> getMatches() {
        return matchManagementService.getMatches();
    }

    @PostMapping("/new-match")
    @ResponseBody
    public Map<Referee, UUID> addNewMatch(@RequestBody Match match) {
        return matchManagementService.addNewMatch(match);
    }
}
