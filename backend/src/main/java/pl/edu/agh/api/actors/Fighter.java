package pl.edu.agh.api.actors;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Fighter {
//    private int points = 0;

    @Id
    private Long id;
    private String name;
    private String surname;
    private Long age;
    private Long weight;

//    public int getPoints() {
//        return points;
//    }

//    public void updatePoints(int diff) {
//        points += diff;
//
//    }

}
