package pl.edu.agh.utils;

import lombok.*;
import pl.edu.agh.constants.Action;

import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Event {
    private UUID fighterId;
    private String action;
    private String actionInfo;
}
