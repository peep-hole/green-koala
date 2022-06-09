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

import java.util.List;
import java.util.Map;
import java.util.UUID;

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
    public ResponseEntity<Void> stopMatch(@PathVariable String id) {
        if (!matchStatusManager.isMatchRunning(UUID.fromString(id))) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        matchStatusManager.endMatch(UUID.fromString(id));
        sendUpdateNotificationToReferees();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/{id}/start")
    public ResponseEntity<Void> startMatch(@PathVariable String id) {
        if (!matchStatusManager.isMatchExisting(UUID.fromString(id))) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        matchStatusManager.startMatch(UUID.fromString(id));
        sendUpdateNotificationToReferees();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Match> getMatchStatus(@PathVariable String id) {
        if (!matchStatusManager.isMatchRunning(UUID.fromString(id))) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(matchStatusManager.getMatch(UUID.fromString(id)), HttpStatus.OK);
    }

    @GetMapping("/{id}/events")
    public ResponseEntity<List<RefereeDecision>> getEvents(@PathVariable String id) {
        if (!matchStatusManager.isMatchRunning(UUID.fromString(id))) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(matchStatusManager.getMatch(UUID.fromString(id)).getAcceptedDecisions(), HttpStatus.OK);
    }

    @GetMapping("/{id}/allowed-actions")
    public ResponseEntity<Map<Action, List<String>>> getAllowedActions(@PathVariable String id) {
        if (!matchStatusManager.isMatchRunning(UUID.fromString(id))) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(matchStatusManager.getMatch(UUID.fromString(id)).getAllowedActions(), HttpStatus.OK);
    }

    private void sendUpdateNotificationToReferees() {
        System.out.println("SENDING UPDATE");
        this.template.convertAndSend("/response/status", "update");
    }
}
