package pl.edu.agh.actors;

public class Fighter {
    private int points = 0;

    public Fighter() {

    }

    public int getPoints() {
        return points;
    }

    public void updatePoints(int diff) {
        points += diff;

    }
}
