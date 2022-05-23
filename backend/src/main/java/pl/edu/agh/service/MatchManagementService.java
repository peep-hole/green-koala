package pl.edu.agh.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.agh.constants.Event;
import pl.edu.agh.constants.RefereeType;
import pl.edu.agh.model.Match;
import pl.edu.agh.repository.MatchManagementRepository;
import pl.edu.agh.utils.Tokenizer;

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

    public Map<RefereeType, UUID> addNewMatch(Match match) {
        if (match.getId() == null) {
            match.setId(UUID.randomUUID());
        }
        match.setMainRefereeToken(tokenizer.generateToken());
        match.setSideRefereeToken1(tokenizer.generateToken());
        match.setSideRefereeToken2(tokenizer.generateToken());

        matchManagementRepository.save(match);
        return Map.of(RefereeType.MAIN_REFEREE, match.getMainRefereeToken(),
                RefereeType.SIDE_REFEREE_1, match.getSideRefereeToken1(),
                RefereeType.SIDE_REFEREE_2, match.getSideRefereeToken2());
    }

    public Match getMatchById(UUID id) {
        return matchManagementRepository.findById(id).orElse(null);
    }

    public boolean matchExists(Match match) {
        return matchManagementRepository.existsById(match.getId());
    }

    public boolean matchIdExists(UUID id) {
        return matchManagementRepository.existsById(id);
    }

    public void deleteMatch(UUID id) {matchManagementRepository.deleteById(id);}

    public void updateMatch(Match match) {matchManagementRepository.save(match);}

    public void addEvent(UUID id){
        Match match = matchManagementRepository.getById(id);
        match.addEvent(Event.ATTACK);
        matchManagementRepository.save(match);
    }
}
