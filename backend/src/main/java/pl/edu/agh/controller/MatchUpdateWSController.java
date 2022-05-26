package pl.edu.agh.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.component.MatchStatusManager;
import pl.edu.agh.constants.Action;
import pl.edu.agh.model.Match;
import pl.edu.agh.websocket.RefereeDecision;

import java.util.*;

@RequiredArgsConstructor
@RestController
@Controller
@RequestMapping("/status")
public class MatchUpdateWSController {
    private final SimpMessagingTemplate template;
    private final MatchStatusManager matchStatusManager;

    @PostMapping("/{id}/decision")
    public ResponseEntity<Boolean> updateDecision(@PathVariable String id, @RequestBody RefereeDecision decision) {
        try {
            matchStatusManager.processStatusMessage(UUID.fromString(id), decision);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        sendUpdateNotificationToReferees();
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @PostMapping("/{id}/stop")
    public void stopMatch(@PathVariable String id) {
        matchStatusManager.endMatch(UUID.fromString(id));
        sendUpdateNotificationToReferees();
    }

    @PostMapping("/{id}/start")
    public void startMatch(@PathVariable String id) {
        matchStatusManager.startMatch(UUID.fromString(id));
        sendUpdateNotificationToReferees();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Match> getMatchStatus(@PathVariable String id) {
        return new ResponseEntity<>(matchStatusManager.getMatch(UUID.fromString(id)), HttpStatus.OK);
    }

    @GetMapping("/{id}/allowed-actions")
    public ResponseEntity<Map<Action, List<String>>> getAllowedActions(@PathVariable String id) {
        Map<Action, List<String>> possibleActions = new HashMap<>();
        possibleActions.put(Action.ATTACK, Arrays.asList("succeed", "failed"));
        possibleActions.put(Action.DEFENSE, Arrays.asList("succeed", "failed"));
        possibleActions.put(Action.HIT, Arrays.asList("head", "arm", "forearm", "hand", "leg", "knee"));

        return new ResponseEntity<>(possibleActions, HttpStatus.OK);
    }

    private void sendUpdateNotificationToReferees() {
        System.out.println("SENDING UPDATE");
        this.template.convertAndSend("/response/status", "update");
    }
}
