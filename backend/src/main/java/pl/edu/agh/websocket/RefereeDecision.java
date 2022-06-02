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
}
