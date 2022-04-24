package pl.edu.agh.api.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.agh.api.actors.Referee;
import pl.edu.agh.api.database.MatchManagementRepository;
import pl.edu.agh.api.model.Match;
import pl.edu.agh.tokenizer.Tokenizer;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MatchManagementService {
    private final Tokenizer tokenizer = new Tokenizer();
    private final MatchManagementRepository matchManagementRepository;

    public List<Match> getAllMatches() {
        return matchManagementRepository.findAll();
    }

    public Map<Referee, UUID> addNewMatch(Match match) {
        if (match.getId() == null) {
            match.setId(UUID.randomUUID());
        }
        match.setMainRefereeToken(tokenizer.generateToken());
        match.setSideRefereeToken1(tokenizer.generateToken());
        match.setSideRefereeToken2(tokenizer.generateToken());

        matchManagementRepository.save(match);
        return Map.of(Referee.MAIN_REFEREE, match.getMainRefereeToken(),
                Referee.SIDE_REFEREE_1, match.getSideRefereeToken1(),
                Referee.SIDE_REFEREE_2, match.getSideRefereeToken2());
    }
}
