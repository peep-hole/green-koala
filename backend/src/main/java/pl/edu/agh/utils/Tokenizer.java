package pl.edu.agh.utils;

import java.util.UUID;

public class Tokenizer {

    public Tokenizer() {
    }

    public UUID generateToken() {
        return UUID.randomUUID();
    }
}
