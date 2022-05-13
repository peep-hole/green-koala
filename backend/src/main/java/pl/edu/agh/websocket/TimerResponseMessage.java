package pl.edu.agh.websocket;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TimerResponseMessage implements Serializable {
    long time;
    boolean matchEnded;
}
