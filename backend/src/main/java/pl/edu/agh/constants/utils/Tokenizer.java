package pl.edu.agh.constants.utils;

import java.util.UUID;

public class Tokenizer {

    public Tokenizer() {
    }

    public UUID generateToken() {
        return UUID.randomUUID();
    }

    public int getMatchIdByToken(UUID token) {
        return 0;
    }
}
