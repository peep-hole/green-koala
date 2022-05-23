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

    public void processStatusMessage(DecisionMessage message){

    }
}
