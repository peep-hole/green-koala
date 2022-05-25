package pl.edu.agh.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import pl.edu.agh.constants.RefereeType;
import pl.edu.agh.controller.MatchManagementController;
import pl.edu.agh.model.Match;
import pl.edu.agh.service.MatchManagementService;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(MatchManagementController.class)
public class MatchManagementControllerTest {
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private MatchManagementService matchManagementService;

    @Test
    void getMatches() throws Exception {
        //given
        UUID id = UUID.randomUUID();
        Match match = new Match();
        match.setId(id);
        List<Match> matchList = List.of(match);
        given(matchManagementService.getAllMatches()).willReturn(matchList);

        //when & then
        mockMvc.perform(get("/matches/all")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].id", is(id.toString())));
    }

    @Test
    void addNewMatch() throws Exception {
        //given
        UUID id = UUID.randomUUID();
        UUID mainToken = UUID.randomUUID();
        UUID sideToken1 = UUID.randomUUID();
        UUID sideToken2 = UUID.randomUUID();
        Match match = new Match(id, null, null, null, null, mainToken,
                null, sideToken1, null, sideToken2, null, null, null, null);
        given(matchManagementService.addNewMatch(match)).willReturn(Map.of(
                RefereeType.MAIN_REFEREE, match.getMainRefereeToken(),
                RefereeType.SIDE_REFEREE_1, match.getSideRefereeToken1(),
                RefereeType.SIDE_REFEREE_2, match.getSideRefereeToken2()));
        String json = objectMapper.writeValueAsString(match);

        //when & then
        mockMvc.perform(post("/matches/new-match")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.MAIN_REFEREE", is(match.getMainRefereeToken().toString())));
    }

    @Test
    void getMatchByRefereeTokenFound() throws Exception {
        //given
        UUID id = UUID.randomUUID();
        UUID mainToken = UUID.randomUUID();
        UUID sideToken1 = UUID.randomUUID();
        UUID sideToken2 = UUID.randomUUID();
        Match match = new Match(id, null, null, null, null, mainToken,
                null, sideToken1, null, sideToken2, null, null, null, null);
        List<Match> matchList = List.of(match);
        given(matchManagementService.getAllMatches()).willReturn(matchList);

        //when & then
        mockMvc.perform(get("/matches/token/" + match.getMainRefereeToken())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(match.getId().toString())));

    }

    @Test
    void getMatchByRefereeTokenNotFound() throws Exception {
        //given
        UUID id = UUID.randomUUID();
        UUID mainToken = UUID.randomUUID();
        UUID sideToken1 = UUID.randomUUID();
        UUID sideToken2 = UUID.randomUUID();
        UUID randomUUID = UUID.randomUUID();
        Match match = new Match(id, null, null, null, null, mainToken,
                null, sideToken1, null, sideToken2, null, null, null, null);
        List<Match> matchList = List.of(match);
        given(matchManagementService.getAllMatches()).willReturn(matchList);

        //when & then
        mockMvc.perform(get("/matches/token/" + randomUUID)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    void getMatchByIdFound() throws Exception {
        //given
        UUID id = UUID.randomUUID();
        Match match = new Match();
        match.setId(id);
        given(matchManagementService.getMatchById(id)).willReturn(match);
        given(matchManagementService.matchIdExists(id)).willReturn(true);

        //when & then
        mockMvc.perform(get("/matches/id/" + id)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(match.getId().toString())));
    }

    @Test
    void getMatchByIdNotFound() throws Exception {
        //given
        UUID id = UUID.randomUUID();
        given(matchManagementService.matchIdExists(id)).willReturn(false);

        //when & then
        mockMvc.perform(get("/matches/id/" + id)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    void cancelMatchFound() throws Exception {
        //given
        UUID id = UUID.randomUUID();
        given(matchManagementService.matchIdExists(id)).willReturn(true);

        //when & then
        mockMvc.perform(delete("/matches/cancel/" + id)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(true)));
    }

    @Test
    void cancelMatchNotFound() throws Exception {
        //given
        UUID id = UUID.randomUUID();
        given(matchManagementService.matchIdExists(id)).willReturn(false);

        //when & then
        mockMvc.perform(delete("/matches/cancel/" + id)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}
