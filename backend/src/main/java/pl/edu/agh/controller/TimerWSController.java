package pl.edu.agh.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import pl.edu.agh.model.Message;
import pl.edu.agh.utils.Timer;
import pl.edu.agh.websocket.TimerMessage;

@Controller
public class TimerWSController {
    private final Timer timer = new Timer();

    @MessageMapping("/timer")
    @SendTo("/test/response")
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
}
