package pl.edu.agh.api.repository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import pl.edu.agh.model.Match;
import pl.edu.agh.repository.MatchManagementRepository;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@DataJpaTest
public class MatchManagementRepositoryTest {
    @Autowired
    MatchManagementRepository repository;

    private Match match;

    @BeforeEach
    public void setup() {
        UUID id = UUID.randomUUID();
        match = Match.builder()
                .id(id)
                .date("13.01.2022")
                .build();
    }

    @Test
    public void shouldFindNoMatchesIfRepositoryEmpty() {
        // when
        List<Match> matches = repository.findAll();

        // then
        assertThat(matches)
                .isEmpty();
    }

    @Test
    public void shouldReturnMatchesIfRepositoryNotEmpty() {
        // given
        UUID secondId = UUID.randomUUID();
        Match secondMatch = Match.builder()
                .id(secondId)
                .build();

        repository.save(match);
        repository.save(secondMatch);

        // when
        List<Match> matches = repository.findAll();

        // then
        assertThat(matches)
                .isNotEmpty()
                .hasSize(2)
                .extracting(Match::getId)
                .containsExactlyInAnyOrder(match.getId(), secondId);
    }

    @Test
    public void shouldSuccessfullySaveMatch() {
        // when
        Match savedMatch = repository.save(match);

        // then
        assertThat(savedMatch)
                .isNotNull()
                .isEqualTo(match);
    }

    @Test
    public void shouldFindExistentMatchById() {
        // given
        repository.save(match);

        // when
        Match foundMatch = repository.findById(match.getId()).orElse(null);

        // then
        assertThat(foundMatch)
                .isNotNull()
                .isEqualTo(match);
    }

    @Test
    public void shouldNotFindNotExistentMatchById() {
        // when
        Match foundMatch = repository.findById(UUID.randomUUID()).orElse(null);

        // then
        assertThat(foundMatch)
                .isNull();
    }

    @Test
    public void shouldSuccessfullyUpdateMatch() {
        // given
        repository.save(match);

        // when
        Match foundMatch = repository.findById(match.getId()).orElse(null);
        assertThat(foundMatch).isNotNull();
        foundMatch.setDate("24.05.2022");
        Match updatedMatch = repository.save(foundMatch);

        // then
        assertThat(updatedMatch.getDate()).isEqualTo("24.05.2022");
    }

    @Test
    public void shouldSuccessfullyDeleteMatchById() {
        // given
        repository.save(match);

        // when
        repository.deleteById(match.getId());
        Match foundMatch = repository.findById(match.getId()).orElse(null);

        // then
        assertThat(foundMatch).isNull();
    }
}
