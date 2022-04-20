package pl.edu.agh.actors;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Fighter {
//    private int points = 0;

     @Id
    private Long id;
    private String name;
    private String surname;
    private Long age;
    private Long weight;

    public Fighter() {

        // TODO change constructor


    }

//    public int getPoints() {
//        return points;
//    }

//    public void updatePoints(int diff) {
//        points += diff;
//
//    }
}
