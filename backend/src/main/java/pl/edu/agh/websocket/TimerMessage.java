package pl.edu.agh.websocket;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TimerMessage {
    public enum Action {START, STOP, GET, RESET}

    Action action;
}
