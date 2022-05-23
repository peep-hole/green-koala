package pl.edu.agh.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import pl.edu.agh.MatchStatusManager;
import pl.edu.agh.model.Match;
import pl.edu.agh.websocket.DecisionMessage;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
@Controller
@RequestMapping("/status")
public class MatchUpdateWSController {
    private final SimpMessagingTemplate template;
    private final MatchStatusManager matchStatusManager;

    @PostMapping("/{id}/decision")
    public ResponseEntity<Boolean> updateDecision(@PathVariable String id, @RequestBody DecisionMessage decision) {
        try {
            matchStatusManager.processStatusMessage(UUID.fromString(id), decision);
        } catch (RuntimeException e){
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


    private void sendUpdateNotificationToReferees() {
        System.out.println("SENDING UPDATE");
        this.template.convertAndSend("/response/status", "update");
    }
}
