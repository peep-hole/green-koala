package pl.edu.agh;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Component;
import pl.edu.agh.model.Match;
import pl.edu.agh.service.MatchManagementService;
import pl.edu.agh.websocket.DecisionMessage;

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
        matchMap.put(matchId, match);
    }

    public void endMatch(UUID matchId) {
        Match match = matchMap.get(matchId);
        matchManagementService.addNewMatch(match);
        matchMap.remove(matchId);
    }

    public void processStatusMessage(UUID matchId, DecisionMessage message) throws RuntimeException {
        Match match = matchMap.get(matchId);

        if (message.getRefereeToken().equals(match.getMainRefereeToken())) {
            match.setFighter1Points(match.getFighter1Points() + message.getFighter1Points());
            match.setFighter2Points(match.getFighter2Points() + message.getFighter2Points());
            // todo update event list in match
        } else {
            // ?????
            SideRefereeDecision decision;
            if (message.getRefereeToken().equals(match.getSideRefereeToken1())) {
                decision = match.getReferee1Decision();
            } else if (message.getRefereeToken().equals(match.getSideRefereeToken2())) {
                decision = match.getReferee2Decision();
            } else {
                throw new RuntimeException("WRONG REFEREE ID");
            }

            // ?????
//            decision.points1 = message.getFighter1Points();
//            decision.points2 = message.getFighter2Points();
//            decision.decision = message.getDecision();
            decision.setFighter1Points(message.getFighter1Points());
            decision.setFighter2Points(message.getFighter2Points());
            decision.setDecision(message.getDecision());

        }
    }

    public Match getMatch(UUID matchId) {
        return matchMap.get(matchId);
    }
}
