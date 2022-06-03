package pl.edu.agh.component;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Component;
import pl.edu.agh.constants.MatchRule;
import pl.edu.agh.constants.MatchRules;
import pl.edu.agh.model.Match;
import pl.edu.agh.service.MatchManagementService;
import pl.edu.agh.websocket.RefereeDecision;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Component
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class MatchStatusManager {
    private final MatchManagementService matchManagementService;
    private final Map<UUID, Match> matchMap = new HashMap<>();

    @PostConstruct
    public void init() {

    }

    public void startMatch(UUID matchId) {
        Match match = matchManagementService.getMatchById(matchId);
        if(!matchMap.containsKey(matchId)) matchMap.put(matchId, match);
    }

    public void endMatch(UUID matchId) {
        Match match = matchMap.get(matchId);
        match.setFinished(true);
        matchManagementService.addNewMatch(match);
        matchMap.remove(matchId);
    }

    public void processStatusMessage(UUID matchId, RefereeDecision message) throws RuntimeException {
        if (!matchMap.containsKey(matchId)) {
            throw new RuntimeException("No match found with id: " + matchId);
        }
        Match match = matchMap.get(matchId);

        if (message.getRefereeToken().equals(match.getMainRefereeToken())) {
            System.out.println("MAIN REFEREE");
            match.setFighter1Points(match.getFighter1Points() + message.getFighter1Points());
            match.setFighter2Points(match.getFighter2Points() + message.getFighter2Points());
            match.getAcceptedDecisions().add(message);
        } else {
            RefereeDecision decision;
            if (message.getRefereeToken().equals(match.getSideRefereeToken1())) {
                decision = match.getReferee1Decision();
            } else if (message.getRefereeToken().equals(match.getSideRefereeToken2())) {
                decision = match.getReferee2Decision();
            } else {
                throw new RuntimeException("WRONG REFEREE ID");
            }

            decision.setRefereeToken(message.getRefereeToken());
            decision.setFighter1Points(message.getFighter1Points());
            decision.setFighter2Points(message.getFighter2Points());
            decision.setDecision(message.getDecision());
        }
    }

    public boolean checkIfMatchShouldEnd(long time) {
        if (time > (int) MatchRules.getMatchRules().get(MatchRule.MAX_TIME) * 60 * 1000)
            return true;
        return false;
    }

    public Match getMatch(UUID matchId) {
        return matchMap.get(matchId);
    }
}
