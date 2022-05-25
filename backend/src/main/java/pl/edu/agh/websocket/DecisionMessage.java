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
    Integer points1;
    Integer points2;
    List<Event> decision;
    UUID refereeToken;
}
