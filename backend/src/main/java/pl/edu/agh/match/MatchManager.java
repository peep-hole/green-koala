package pl.edu.agh.match;

import pl.edu.agh.actors.Fighter;
import pl.edu.agh.actors.Referee;

import java.util.LinkedList;

public class MatchManager {

    private final Fighter fighter1;
    private final Fighter fighter2;
    private final Referee mainReferee;
    private final Referee sideReferee1;
    private final Referee sideReferee2;
    private final LinkedList<Event> events;
    private final Timer timer;


    public MatchManager(Fighter fighter1,
                        Fighter fighter2,
                        Referee mainReferee,
                        Referee sideReferee1,
                        Referee sideReferee2,
                        Timer timer) {

        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.mainReferee = mainReferee;
        this.sideReferee1 = sideReferee1;
        this.sideReferee2 = sideReferee2;
        this.timer = timer;
        events = new LinkedList<>();
    }

    public void startMatch() {

    }


    public void addEvent(Event event) {
        events.add(event);
    }



}
