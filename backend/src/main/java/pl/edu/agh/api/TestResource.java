package pl.edu.agh.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = {"http://localhost:19002/", "http://localhost:19006"})
@RestController
public class TestResource {

    @GetMapping("/test")
    public ResponseEntity<String> test(){
        return ResponseEntity.ok().body("TEST");
    }
}

