package pl.edu.agh.websocket;

import lombok.*;
import pl.edu.agh.constants.Event;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DecisionMessage {
    private Integer fighter1Points;
    private Integer fighter2Points;
    private List<Event> decision;
    private UUID refereeToken;
}
