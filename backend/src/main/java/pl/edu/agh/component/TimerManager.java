package pl.edu.agh.component;


import org.springframework.stereotype.Component;
import pl.edu.agh.utils.Timer;

import javax.annotation.PostConstruct;

@Component
public class TimerManager {
    public final Timer timer = new Timer();

    @PostConstruct
    public void init() {

    }

    public long getTime() {
        return timer.getTime();
    }

    public void stopTime() {
        timer.stopTime();
    }

    public void startTime() {
        timer.startTime();
    }

    public void resetTime() {
        timer.resetTime();
    }
}