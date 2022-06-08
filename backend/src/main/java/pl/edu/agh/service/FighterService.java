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

    public Fighter registerFighter(Fighter fighter) {
        if (fighter.getId() == null) {
            do {
                fighter.setId(UUID.randomUUID());
            }
            while (fighterExists(fighter));
        }

        return fighterRepository.save(fighter);
    }

    public Fighter getFighterById(UUID id) {
        return fighterRepository.findById(id).orElse(null);
    }

    public boolean fighterExists(Fighter fighter) {
        return fighterIdExists(fighter.getId());
    }

    public boolean fighterIdExists(UUID id) {
        return fighterRepository.existsById(id);
    }

    public void deleteFighter(UUID id) {
        fighterRepository.deleteById(id);
    }
}
