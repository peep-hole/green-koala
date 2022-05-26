package pl.edu.agh.constants;

import java.util.HashMap;
import java.util.Map;

public class MatchRules {
    static public Map<MatchRule, Object> getMatchRules(){
        Map<MatchRule, Object> rules = new HashMap<>();
        rules.put(MatchRule.MAX_TIME, 20);

        return rules;
    }
}
