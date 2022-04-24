package pl.edu.agh.api.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.agh.api.actors.Fighter;
import pl.edu.agh.api.database.FighterRepository;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FighterService {
    private final FighterRepository fighterRepository;

    public List<Fighter> getAllFighters() {
        return fighterRepository.findAll();
    }

    public void registerFighter(Fighter fighter) {
        if (fighter.getId() == null) {
            fighter.setId(UUID.randomUUID());
        }
        fighterRepository.save(fighter);
    }
}
