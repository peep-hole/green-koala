package pl.edu.agh.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RefereeApplication {
	private final boolean branch_publish = true;

	public static void main(String[] args) {
		SpringApplication.run(RefereeApplication.class, args);
	}

}
