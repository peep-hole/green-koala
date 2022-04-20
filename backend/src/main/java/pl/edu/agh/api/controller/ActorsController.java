package pl.edu.agh.api.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/actors")
public class ActorsController {

    @GetMapping("/fighters")
    public UUID getAllFighters() {
        return UUID.randomUUID(); // TODO: change body and func type List of  fighters
    }


    @PostMapping("/registerFighter")
    public void registerPlayer() {
        // TODO
    }
}
