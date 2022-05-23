package pl.edu.agh.api.repository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import pl.edu.agh.model.Fighter;
import pl.edu.agh.repository.FighterRepository;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@DataJpaTest
public class FighterRepositoryTest {
    @Autowired
    FighterRepository fighterRepository;

    private Fighter fighter;

    @BeforeEach
    public void setup() {
        UUID id = UUID.randomUUID();
        fighter = Fighter.builder()
                .id(id)
                .name("Michael")
                .surname("Scott")
                .age(43L)
                .weight(80L)
                .build();

    }

    @Test
    public void shouldFindNoFightersIfRepositoryEmpty() {
        // when
        List<Fighter> fighters = fighterRepository.findAll();

        // then
        assertThat(fighters)
                .isEmpty();
    }

    @Test
    public void shouldReturnFightersIfRepositoryNotEmpty() {
        // given
        UUID secondId = UUID.randomUUID();
        Fighter secondFighter = Fighter.builder()
                .id(secondId)
                .name("Dwight")
                .surname("Schrute")
                .age(35L)
                .weight(90L)
                .build();

        fighterRepository.save(fighter);
        fighterRepository.save(secondFighter);

        // when
        List<Fighter> fighters = fighterRepository.findAll();

        // then
        assertThat(fighters)
                .isNotEmpty()
                .hasSize(2)
                .extracting(Fighter::getId)
                .containsExactlyInAnyOrder(fighter.getId(), secondId);
    }

    @Test
    public void shouldSuccessfullySaveFighter() {
        // when
        Fighter savedFighter = fighterRepository.save(fighter);

        // then
        assertThat(savedFighter)
                .isNotNull()
                .isEqualTo(fighter);
    }

    @Test
    public void shouldFindFighterById() {
        // given
        fighterRepository.save(fighter);

        // when
        Fighter foundFighter = fighterRepository.findById(fighter.getId()).orElse(null);

        // then
        assertThat(foundFighter)
                .isNotNull()
                .isEqualTo(fighter);
    }

    @Test
    public void shouldSuccessfullyUpdateFighter() {
        // given
        fighterRepository.save(fighter);

        // when
        Fighter foundFighter = fighterRepository.findById(fighter.getId()).orElse(null);
        assertThat(foundFighter).isNotNull();
        foundFighter.setName("Jim");
        Fighter updatedFighter = fighterRepository.save(foundFighter);

        // then
        assertThat(updatedFighter.getName()).isEqualTo("Jim");
    }

    @Test
    public void shouldSuccessfullyDeleteFighterById() {
        // given
        fighterRepository.save(fighter);

        // when
        fighterRepository.deleteById(fighter.getId());
        Fighter foundFighter = fighterRepository.findById(fighter.getId()).orElse(null);

        // then
        assertThat(foundFighter).isNull();
    }

}
