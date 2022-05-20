package pl.edu.agh.api.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.edu.agh.model.Fighter;
import pl.edu.agh.repository.FighterRepository;
import pl.edu.agh.service.FighterService;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class FighterServiceTest {
    private FighterService fighterService;
    @Mock private FighterRepository fighterRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        fighterService = new FighterService(fighterRepository);
    }

    @Test
    void getAllFighters() {
        //when
        fighterService.getAllFighters();

        //then
        verify(fighterRepository).findAll();
    }

    @Test
    void registerFighter() {
        //given
        Fighter fighter = new Fighter();

        //when
        fighterService.registerFighter(fighter);

        //then
        ArgumentCaptor<Fighter> fighterArgumentCaptor = ArgumentCaptor.forClass(Fighter.class);
        verify(fighterRepository).save(fighterArgumentCaptor.capture());
        Fighter capturedFighter = fighterArgumentCaptor.getValue();
        assertThat(capturedFighter).isEqualTo(fighter);
    }

    @Test
    void getFighterById() {
        //given
        UUID id = UUID.randomUUID();

        //when
        fighterService.getFighterById(id);

        //then
        ArgumentCaptor<UUID> uuidArgumentCaptor = ArgumentCaptor.forClass(UUID.class);
        verify(fighterRepository).findById(uuidArgumentCaptor.capture());
        UUID capturedUuid = uuidArgumentCaptor.getValue();
        assertThat(capturedUuid).isEqualTo(id);
    }

    @Test
    void fighterExists() {
        //given
        Fighter fighter = new Fighter();
        UUID id = UUID.randomUUID();
        fighter.setId(id);

        //when
        fighterService.fighterExists(fighter);

        //then
        ArgumentCaptor<UUID> uuidArgumentCaptor = ArgumentCaptor.forClass(UUID.class);
        verify(fighterRepository).existsById(uuidArgumentCaptor.capture());
        UUID capturedUuid = uuidArgumentCaptor.getValue();
        assertThat(capturedUuid).isEqualTo(id);
    }

    @Test
    void fighterIdExists() {
        //given
        UUID id = UUID.randomUUID();

        //when
        fighterService.fighterIdExists(id);

        //then
        ArgumentCaptor<UUID> uuidArgumentCaptor = ArgumentCaptor.forClass(UUID.class);
        verify(fighterRepository).existsById(uuidArgumentCaptor.capture());
        UUID capturedUuid = uuidArgumentCaptor.getValue();
        assertThat(capturedUuid).isEqualTo(id);
    }
}
