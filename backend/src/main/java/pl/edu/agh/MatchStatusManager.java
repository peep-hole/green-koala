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
    Map<UUID, Match> matchMap = new HashMap<>();

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
            match.setPoints1(match.getPoints1() + message.getPoints1());
            match.setPoints2(match.getPoints2() + message.getPoints2());
            // todo update event list in match
        } else {
            SideRefereeDecision decision;
            if (message.getRefereeToken().equals(match.getSideRefereeToken1())) {
                decision = match.getReferee1Decision();
            } else if (message.getRefereeToken().equals(match.getSideRefereeToken2())) {
                decision = match.getReferee2Decision();
            }
            else {
                throw new RuntimeException("WRONG REFEREE ID");
            }

            decision.points1 = message.getPoints1();
            decision.points2 = message.getPoints2();
            decision.decision = message.getDecision();
        }
    }

    public Match getMatch(UUID matchId){
        return matchMap.get(matchId);
    }
}