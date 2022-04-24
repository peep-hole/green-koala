package pl.edu.agh.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import pl.edu.agh.model.Message;

@Controller
public class WebSocketTestController {
    @MessageMapping("/message")
    @SendTo("/test/response")
    private Message receivedMessage(@Payload Message message){
        System.out.println("Received: " + message.getMessage());
        return new Message("Received your message " + Math.random()); /// Math.random for something dynamic
    }
}
