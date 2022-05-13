package pl.edu.agh;

import org.springframework.stereotype.Component;
import pl.edu.agh.websocket.DecisionMessage;
import javax.annotation.PostConstruct;

@Component
public class MatchStatusManager {
    @PostConstruct
    public void init() {

    }

    public void startMatch(){

    }

    public void endMatch() {

    }

    public void processStatusMessage(DecisionMessage message){

    }
}
