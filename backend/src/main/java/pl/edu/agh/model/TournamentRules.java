package pl.edu.agh.model;

import lombok.*;
import pl.edu.agh.constants.Action;

import javax.persistence.*;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@Entity
@Table
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TournamentRules {
    @Id
    @GeneratedValue
    private Long id;
    private Integer maxTime;

    @ElementCollection
    private List<String> weaponTypes;

    @ElementCollection
    private Map<String, String> allowedActions; // actions split by ';'

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TournamentRules that = (TournamentRules) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
