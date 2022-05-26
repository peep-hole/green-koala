package pl.edu.agh.constants;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class AllowedActions {
    static public Map<Action, List<String>> getAllowedActions(){
        Map<Action, List<String>> possibleActions = new HashMap<>();
        possibleActions.put(Action.ATTACK, Arrays.asList("succeed", "failed"));
        possibleActions.put(Action.DEFENSE, Arrays.asList("succeed", "failed"));
        possibleActions.put(Action.HIT, Arrays.asList("head", "arm", "forearm", "hand", "leg", "knee"));
        return possibleActions;
    }
}
