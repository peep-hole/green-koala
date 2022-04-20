package pl.edu.agh.api.data;

import pl.edu.agh.actors.Fighter;
import pl.edu.agh.actors.Referee;
import pl.edu.agh.match.MatchManager;
import pl.edu.agh.match.Timer;

public class MatchManagement {
    /**
        This class will store data about created match like rules name, players, referee etc. what needed.
         Parameter id will be a key to referee tokens and match liva data. Has to be uniq.
    **/

    private final String id;
    private final MatchManager manager;

    public MatchManagement(String id, Fighter fighter1, Fighter fighter2, Referee main, Referee side1, Referee side2){
        this.id = id;

        this.manager = new MatchManager(fighter1, fighter2, main, side1, side2, new Timer());


    }

    public String getId() {
        return "Some Id" + id;
    }

    public String getMainRefereeToken() {
        return "Some Main Referee Token";
    }

    public String getSideRefereeTokens() {
        return "Token 1: abc1, Token2: def2";
    }

    public String getManager() {
        return manager.toString();
    }

}
