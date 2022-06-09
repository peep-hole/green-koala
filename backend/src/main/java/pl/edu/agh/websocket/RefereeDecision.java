package pl.edu.agh.websocket;

import lombok.*;
import pl.edu.agh.utils.Event;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RefereeDecision {
    private Integer fighter1Points;
    private Integer fighter2Points;
    private List<Event> decision;
    private UUID refereeToken;

    public void reset(){
        fighter1Points = null;
        fighter2Points = null;
        decision = null;
        refereeToken = null;
    }

    public boolean isEmpty(){
        if (fighter1Points ==null|| fighter2Points == null || decision==null)
            return true;
        if (fighter1Points == 0 && fighter2Points == 0 && decision.isEmpty())
            return true;
        return false;
    }
}
