package pl.edu.agh.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.edu.agh.model.Match;

import java.util.UUID;

@Repository
public interface MatchManagementRepository extends JpaRepository<Match, UUID> {
}
