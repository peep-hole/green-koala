package pl.edu.agh.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.agh.model.Tournament;
import pl.edu.agh.repository.TournamentRepository;

import java.util.List;

@Service
@RequiredArgsConstructor

public class TournamentService {
    private final TournamentRepository tournamentRepository;


    public void add(Tournament tournament) {
        tournamentRepository.save(tournament);
    }

    public void remove(Long id) {
        tournamentRepository.deleteById(id);
    }

    public Tournament getById(Long id) {
        return tournamentRepository.findById(id).orElse(null);
    }

    public List<Tournament> getAll() {
        return tournamentRepository.findAll();
    }
}