package pl.edu.agh.config;


import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import pl.edu.agh.model.Fighter;
import pl.edu.agh.model.Match;
import pl.edu.agh.service.FighterService;
import pl.edu.agh.service.MatchManagementService;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Configuration
public class AppConfig {

    @Bean
    public CommandLineRunner commandLineRunner(FighterService fighterService, MatchManagementService matchManagementService) {

        return args -> {

            Fighter fighter1 = new Fighter(UUID.fromString("3744a802-c70b-11ec-9d64-0242ac120002"), "John", "Doe", 33L, 80L);
            Fighter fighter2 = new Fighter(UUID.fromString("3744aa64-c70b-11ec-9d64-0242ac120002"), "Jack", "Sparrow", 33L, 80L);
            Fighter fighter3 = new Fighter(UUID.fromString("3744aba4-c70b-11ec-9d64-0242ac120002"), "Rocky", "Balboa", 48L, 70L);
            Fighter fighter4 = new Fighter(UUID.fromString("3744acd0-c70b-11ec-9d64-0242ac120002"), "Arnold", "Schwarzenegger", 45L, 95L);

            Match match1 = new Match();
            match1.setId(UUID.fromString("ea5d74b4-c70b-11ec-9d64-0242ac120002"));
            match1.setFighterId1(fighter1.getId());
            match1.setFighterId2(fighter2.getId());
            match1.setDate("29.04.2022");
            match1.setTime("16:15");

            Match match2 = new Match();
            match2.setId(UUID.fromString("ea5d7716-c70b-11ec-9d64-0242ac120002"));
            match2.setFighterId1(fighter3.getId());
            match2.setFighterId2(fighter4.getId());
            match2.setDate("13.05.2022");
            match2.setTime("13:13");

            Match match3 = new Match();
            match3.setId(UUID.fromString("ea5d4355-c70b-11ec-9d64-0242ac120002"));
            match3.setFighterId1(fighter3.getId());
            match3.setFighterId2(fighter4.getId());
            match3.setDate("18.05.2022");
            match3.setTime("13:13");

            Match match4 = new Match();
            match4.setId(UUID.fromString("ea5d4222-c70b-11ec-9d64-0242ac120002"));
            match4.setFighterId1(fighter3.getId());
            match4.setFighterId2(fighter4.getId());
            match4.setDate("18.06.2022");
            match4.setTime("13:13");

            Match match5 = new Match();
            match5.setId(UUID.fromString("ea5d1111-c70b-11ec-9d64-0242ac120002"));
            match5.setFighterId1(fighter1.getId());
            match5.setFighterId2(fighter2.getId());
            match5.setDate("29.11.2022");
            match5.setTime("16:15");

            List<Fighter> fighters = Arrays.asList(fighter1, fighter2, fighter3, fighter4);
            fighters.forEach((Fighter fighter) -> {
                if (!fighterService.fighterExists(fighter)) fighterService.registerFighter(fighter);
            });

            List<Match> matches = Arrays.asList(match1, match2, match3, match4, match5);
            matches.forEach((Match match) -> {
                if (!matchManagementService.matchExists(match)) matchManagementService.addNewMatch(match);
            });
        };
    }
}
