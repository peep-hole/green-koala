package pl.edu.agh;

import lombok.Getter;
import lombok.Setter;
import pl.edu.agh.constants.Event;

import java.util.List;

@Getter
@Setter
public class SideRefereeDecision {
    private Integer fighter1Points;
    private Integer fighter2Points;
    private List<Event> decision;
}
