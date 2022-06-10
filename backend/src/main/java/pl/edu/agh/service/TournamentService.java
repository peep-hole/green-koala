package pl.edu.agh.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.agh.repository.TournamentRepository;

@Service
@RequiredArgsConstructor

public class TournamentService {
    private final TournamentRepository tournamentRepository;


}