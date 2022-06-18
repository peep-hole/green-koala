package pl.edu.agh.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.edu.agh.repository.TournamentRulesRepository;

@Service
@RequiredArgsConstructor

public class TournamentRulesService {
    private final TournamentRulesRepository rulesRepository;


}