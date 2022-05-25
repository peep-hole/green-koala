package pl.edu.agh;

import lombok.Getter;
import lombok.Setter;
import pl.edu.agh.constants.Event;

import java.util.List;

@Getter
@Setter
public class SideRefereeDecision {
    Integer points1;
    Integer points2;

    List<Event> decision;
}
