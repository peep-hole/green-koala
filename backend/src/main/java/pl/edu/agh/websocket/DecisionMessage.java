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
    int points1;
    int points2;

    List<Event> decision;
    UUID refereeToken;
}
