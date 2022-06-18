package pl.edu.agh.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.edu.agh.model.Fighter;
import pl.edu.agh.model.Tournament;

import java.util.UUID;

@Repository
public interface TournamentRepository extends JpaRepository<Tournament, Long> {
}
