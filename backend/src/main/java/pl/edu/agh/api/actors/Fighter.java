package pl.edu.agh.api.actors;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.UUID;

@Entity
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Fighter {
    @Id
    private UUID id;
    private String name;
    private String surname;
    private Long age;
    private Long weight;
}
