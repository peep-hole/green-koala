package pl.edu.agh.match;

public class Timer {
    private long sumTime;
    private long startTimestamp;
    private boolean isRunning;
    public Timer() {

    }

    public void startTime() {
        startTimestamp = System.currentTimeMillis();
        isRunning = true;
    }

    public void stopTime() {
        sumTime += System.currentTimeMillis() - startTimestamp;
        isRunning = false;
    }

    public long getTime() {
        return isRunning ? sumTime + System.currentTimeMillis() - startTimestamp : sumTime;
    }
}