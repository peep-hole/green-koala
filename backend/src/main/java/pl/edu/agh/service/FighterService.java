package pl.edu.agh.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.agh.model.Fighter;
import pl.edu.agh.repository.FighterRepository;

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
            do {
                fighter.setId(UUID.randomUUID());
            }
            while (fighterExists(fighter));
        }

        fighterRepository.save(fighter);
    }

    public boolean fighterExists(Fighter fighter) {
        return fighterRepository.existsById(fighter.getId());
    }
}
