package pl.edu.agh.model;

import lombok.*;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Match {
    @Id
    @Column(nullable = false, unique = true, updatable = false, columnDefinition = "uuid")
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
    private Integer fighter1Points;
    private Integer fighter2Points;
    // TODO add event lis
    // TODO consider dividing into two separate classes

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
