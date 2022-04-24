package pl.edu.agh.api.actors;

import lombok.*;
import org.hibernate.Hibernate;

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
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class Fighter {
    @Id
    private UUID id;
    private String name;
    private String surname;
    private Long age;
    private Long weight;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        Fighter fighter = (Fighter) o;
        return id != null && Objects.equals(id, fighter.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
