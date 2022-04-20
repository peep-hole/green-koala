package pl.edu.agh.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.edu.agh.api.actors.Fighter;
import pl.edu.agh.api.database.FighterRepository;

import java.util.List;

@Service
public class FighterQueryService {
    @Autowired
    private FighterRepository fighterRepository;

    public List<Fighter> getAllFighters(){
        return fighterRepository.findAll();
    }

    public void registerFighter(Fighter fighter){
        fighterRepository.save(fighter);
    }
}
