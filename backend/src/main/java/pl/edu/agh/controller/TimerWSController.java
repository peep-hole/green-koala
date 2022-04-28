package pl.edu.agh.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;
import pl.edu.agh.model.Message;
import pl.edu.agh.utils.Timer;
import pl.edu.agh.websocket.TimerMessage;

@RequiredArgsConstructor
@Controller
@EnableScheduling
public class TimerWSController {
    private final Timer timer = new Timer();
    private final SimpMessagingTemplate template;

    @MessageMapping("/timer")
    @SendTo("/response/timer")
    private String receivedMessage(@Payload TimerMessage message) {
        System.out.println("TIMER CONTROLLER " + message);

        switch (message.getAction()) {
            case STOP:
                timer.stopTime();
                break;
            case START:
                timer.startTime();
                break;
            default:
                break;
        }

        return String.valueOf(timer.getTime());
    }

    @Scheduled(fixedRate = 500)
    public void sendTimerToReferees(){
        this.template.convertAndSend("/response/timer", timer.getTime());
    }
}
