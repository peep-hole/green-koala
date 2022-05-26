package pl.edu.agh.model;

import lombok.*;
import org.hibernate.Hibernate;
import pl.edu.agh.constants.Action;
import pl.edu.agh.constants.AllowedActions;
import pl.edu.agh.constants.MatchRule;
import pl.edu.agh.constants.MatchRules;
import pl.edu.agh.websocket.RefereeDecision;

import javax.persistence.*;
import java.util.*;

@Entity
@Table
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Match {
    @Transient
    private final RefereeDecision referee1Decision = new RefereeDecision();
    @Transient
    private final RefereeDecision referee2Decision = new RefereeDecision();
    @Transient
    private final List<RefereeDecision> acceptedDecisions = new LinkedList<>();
    @Transient
    private final Map<Action, List<String>> allowedActions = AllowedActions.getAllowedActions();
    @Transient
    private final Map<MatchRule, Object> matchRules = MatchRules.getMatchRules();
    @Id
    @Column(columnDefinition = "uuid")
    private UUID id;
    private UUID fighterId1;
    private UUID fighterId2;
    private String date;
    private String time;
    private UUID mainRefereeToken;
    private Long mainRefereeId;
    private UUID sideRefereeToken1;
    private Long sideRefereeId1;
    private UUID sideRefereeToken2;
    private Long sideRefereeId2;
    private Integer fighter1Points = 0;
    private Integer fighter2Points = 0;
    private boolean finished;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Match match = (Match) o;
        return id != null && Objects.equals(id, match.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
