package pl.edu.agh.api.database;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.edu.agh.api.actors.Fighter;

import java.util.UUID;

@Repository
public interface FighterRepository extends JpaRepository<Fighter, UUID> {

}
