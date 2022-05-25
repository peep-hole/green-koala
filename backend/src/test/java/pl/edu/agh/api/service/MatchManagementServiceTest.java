package pl.edu.agh.api.service;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;
import pl.edu.agh.model.Match;
import pl.edu.agh.repository.MatchManagementRepository;
import pl.edu.agh.service.MatchManagementService;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
public class MatchManagementServiceTest {
    private MatchManagementService matchManagementService;
    @Mock
    private MatchManagementRepository matchManagementRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        matchManagementService = new MatchManagementService(matchManagementRepository);
    }

    @Test
    void getAllMatches() {
        //when
        matchManagementService.getAllMatches();

        //then
        verify(matchManagementRepository).findAll();
    }

    @Test
    void addNewMatch() {
        //given
        Match match = new Match();

        //when
        matchManagementService.addNewMatch(match);

        //then
        ArgumentCaptor<Match> matchArgumentCaptor = ArgumentCaptor.forClass(Match.class);
        verify(matchManagementRepository).save(matchArgumentCaptor.capture());
        Match capturedMatch = matchArgumentCaptor.getValue();
        assertThat(capturedMatch).isEqualTo(match);
    }

    @Test
    void getMatchById() {
        //given
        UUID id = UUID.randomUUID();

        //when
        matchManagementService.getMatchById(id);

        //then
        ArgumentCaptor<UUID> uuidArgumentCaptor = ArgumentCaptor.forClass(UUID.class);
        verify(matchManagementRepository).findById(uuidArgumentCaptor.capture());
        UUID capturedUuid = uuidArgumentCaptor.getValue();
        assertThat(capturedUuid).isEqualTo(id);
    }

    @Test
    void matchExists() {
        //given
        Match match = new Match();
        UUID id = UUID.randomUUID();
        match.setId(id);

        //when
        matchManagementService.matchExists(match);

        //then
        ArgumentCaptor<UUID> uuidArgumentCaptor = ArgumentCaptor.forClass(UUID.class);
        verify(matchManagementRepository).existsById(uuidArgumentCaptor.capture());
        UUID capturedUuid = uuidArgumentCaptor.getValue();
        assertThat(capturedUuid).isEqualTo(id);
    }

    @Test
    void matchIdExists() {
        //given
        UUID id = UUID.randomUUID();

        //when
        matchManagementService.matchIdExists(id);

        //then
        ArgumentCaptor<UUID> uuidArgumentCaptor = ArgumentCaptor.forClass(UUID.class);
        verify(matchManagementRepository).existsById(uuidArgumentCaptor.capture());
        UUID capturedUuid = uuidArgumentCaptor.getValue();
        assertThat(capturedUuid).isEqualTo(id);
    }

    @Test
    void deleteMatch() {
        //given
        Match match = new Match();
        UUID id = UUID.randomUUID();
        match.setId(id);

        //when
        matchManagementService.deleteMatch(id);

        //then
        ArgumentCaptor<UUID> uuidArgumentCaptor = ArgumentCaptor.forClass(UUID.class);
        verify(matchManagementRepository).deleteById(uuidArgumentCaptor.capture());
        UUID capturedUuid = uuidArgumentCaptor.getValue();
        assertThat(capturedUuid).isEqualTo(id);
    }
}
