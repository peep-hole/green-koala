package pl.edu.agh;

import lombok.Getter;
import lombok.Setter;
import pl.edu.agh.constants.Event;

import java.util.List;

@Getter
@Setter
public class SideRefereeDecision {
    int points1;
    int points2;

    List<Event> decision;
}
