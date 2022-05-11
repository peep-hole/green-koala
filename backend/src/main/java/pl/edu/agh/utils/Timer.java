package pl.edu.agh.utils;

public class Timer {
    private long sumTime;
    private long startTimestamp;
    private boolean isRunning;

    public Timer() {
    }

    public void startTime() {
        if (isRunning)
            return;
        startTimestamp = System.currentTimeMillis();
        isRunning = true;
    }

    public void stopTime() {
        if (!isRunning)
            return;
        sumTime += System.currentTimeMillis() - startTimestamp;
        isRunning = false;
    }

    public long getTime() {
        return isRunning ? sumTime + System.currentTimeMillis() - startTimestamp : sumTime;
    }
}