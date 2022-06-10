package pl.edu.agh.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.agh.model.Tournament;
import pl.edu.agh.model.TournamentRules;
import pl.edu.agh.repository.TournamentRulesRepository;

import java.util.List;

@Service
@RequiredArgsConstructor

public class TournamentRulesService {
    private final TournamentRulesRepository rulesRepository;

    public void add(TournamentRules tournamentRules) {
        rulesRepository.save(tournamentRules);
    }

    public void remove(Long id) {
        rulesRepository.deleteById(id);
    }

    public TournamentRules getById(Long id) {
        return rulesRepository.findById(id).orElse(null);
    }

    public List<TournamentRules> getAll() {
        return rulesRepository.findAll();
    }

}