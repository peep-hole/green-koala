package pl.edu.agh.api.services;

import org.springframework.stereotype.Service;
import pl.edu.agh.api.data.MatchManagement;

@Service
public class MatchManagementService {

    public MatchManagement find(String id) {
        return new MatchManagement(id, null, null, null, null, null);
    }

    public MatchManagement save(MatchManagement management) {
        return new MatchManagement("new", null, null, null, null, null);
    }

}
