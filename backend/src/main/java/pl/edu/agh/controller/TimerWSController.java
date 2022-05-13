package pl.edu.agh.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import pl.edu.agh.TimerManager;
import pl.edu.agh.websocket.TimerMessage;
import pl.edu.agh.websocket.TimerResponseMessage;

@RequiredArgsConstructor
@Controller
@EnableScheduling
public class TimerWSController {
    private final TimerManager timerManager;
    private final SimpMessagingTemplate template;

    @MessageMapping("/timer")
    @SendTo("/response/timer")
    private TimerResponseMessage receivedMessage(@Payload TimerMessage message) {
        System.out.println("TIMER CONTROLLER " + message);

        switch (message.getAction()) {
            case STOP:
                timerManager.stopTime();
                break;
            case START:
                timerManager.startTime();
                break;
            case RESTART:
                timerManager.resetTime();
                break;
            default:
                break;
        }

        return new TimerResponseMessage(timerManager.getTime(), false);
    }

    @Scheduled(fixedRate = 500)
    public void sendTimerToReferees(){
        this.template.convertAndSend("/response/timer", new TimerResponseMessage(timerManager.getTime(), false));
    }
}
