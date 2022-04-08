package pl.edu.agh.match;

public class Timer {
    public Timer() {

    }

    private long sumTime;
    private long startTimestamp;
    private boolean isRunning;

    public void startTime(){
        startTimestamp = System.currentTimeMillis();
        isRunning = true;
    }

    public void stopTime(){
        sumTime += System.currentTimeMillis() - startTimestamp;
        isRunning = false;
    }

    public long getTime(){
        return isRunning ? sumTime + System.currentTimeMillis() - startTimestamp: sumTime;
    }

}