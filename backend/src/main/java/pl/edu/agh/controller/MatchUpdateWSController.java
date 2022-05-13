package pl.edu.agh.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import pl.edu.agh.MatchStatusManager;
import pl.edu.agh.websocket.DecisionMessage;

@RequiredArgsConstructor
@Controller
@RequestMapping("/status")
public class MatchUpdateWSController {
    private final SimpMessagingTemplate template;
    private final MatchStatusManager matchStatusManager;

    @PostMapping("/{id}/decision")
    public void updateDecision(@PathVariable String id, @RequestBody DecisionMessage decision) {
        matchStatusManager.processStatusMessage(decision);
        sendUpdateNotificationToReferees();
    }

    private void sendUpdateNotificationToReferees() {
        this.template.convertAndSend("/response/status", "");
    }
}
