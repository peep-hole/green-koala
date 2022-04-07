package pl.edu.agh.tokenizer;

import pl.edu.agh.actors.Referee;
import pl.edu.agh.database.DatabaseManager;

import java.util.UUID;

public class Tokenizer {

    private final DatabaseManager dbManager;

    public Tokenizer(DatabaseManager dbManager) {
        this.dbManager = dbManager;
    }

    public UUID generateToken(int matchId, int refereeId) {

        if (refereeId == Referee.MAIN_REFEREE) System.out.println(":)");

        // TODO: check if token is unique
        return UUID.randomUUID();
    }


    public int getMatchIdByToken(UUID token) {
        return 0;
    }


}
