package pl.edu.agh.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.api.actors.Referee;
import pl.edu.agh.api.database.MatchManagementRepository;
import pl.edu.agh.api.model.Match;
import pl.edu.agh.tokenizer.Tokenizer;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
public class MatchManagementService {
    private final Tokenizer tokenizer = new Tokenizer();  // TODO
    @Autowired
    MatchManagementRepository matchManagementRepository;

    public Map<Referee, UUID> addNewMatch(Match match) {
        match.setMainRefereeToken(tokenizer.generateToken());
        match.setSideRefereeToken1(tokenizer.generateToken());
        match.setSideRefereeToken2(tokenizer.generateToken());

        matchManagementRepository.save(match);
        return Map.of(Referee.MAIN_REFEREE, match.getMainRefereeToken(),
                Referee.SIDE_REFEREE_1, match.getSideRefereeToken1(),
                Referee.SIDE_REFEREE_2, match.getSideRefereeToken2());
    }

    public List<Match> getMatches() {
        return matchManagementRepository.findAll();
    }

}
