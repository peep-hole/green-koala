package pl.edu.agh.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

import java.util.UUID;

@Getter
@AllArgsConstructor
@ToString
public class DetailedMatch {
    private UUID id;
    private String fighter1;
    private String fighter2;
    private String date;
    private String time;
    private boolean isFinished;
}
