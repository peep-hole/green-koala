package pl.edu.agh.tokenizer;

import java.util.UUID;

public class Tokenizer {

    public Tokenizer() {
    }

    public UUID generateToken() {
        // TODO: check if token is unique
        return UUID.randomUUID();
    }


    public int getMatchIdByToken(UUID token) {
        return 0;
    }


}
