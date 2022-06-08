package pl.edu.agh.api.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import pl.edu.agh.controller.ActorsController;
import pl.edu.agh.model.Fighter;
import pl.edu.agh.service.FighterService;

import java.util.List;
import java.util.UUID;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(ActorsController.class)
public class ActorsControllerTest {
    private final ObjectMapper objectMapper = new ObjectMapper();
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private FighterService fighterService;

    @Test
    void getAllFighters() throws Exception {
        //given
        Fighter fighter = new Fighter(null, "Alex", "Smith", 1L, 1L);
        List<Fighter> fighterList = List.of(fighter);
        given(fighterService.getAllFighters()).willReturn(fighterList);

        //when & then
        mockMvc.perform(get("/actors/fighters")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].name", is("Alex")));
    }

    @Test
    void registerFighter() throws Exception {
        //given
        Fighter fighter = new Fighter(UUID.randomUUID(), "Alex", "Smith", 1L, 1L);
        given(fighterService.registerFighter(fighter)).willReturn(fighter);
        String json = objectMapper.writeValueAsString(fighter);

        //when & then
        mockMvc.perform(post("/actors/register-fighter")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(fighter.getId().toString())));
    }

    @Test
    void getFighterByIdFound() throws Exception {
        //given
        Fighter fighter = new Fighter(UUID.randomUUID(), "Alex", "Smith", 1L, 1L);
        given(fighterService.getFighterById(fighter.getId())).willReturn(fighter);
        given(fighterService.fighterIdExists(fighter.getId())).willReturn(true);

        //when & then
        mockMvc.perform(get("/actors/fighters/id/" + fighter.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("Alex")));
    }

    @Test
    void getFighterByIdNotFound() throws Exception {
        //given
        Fighter fighter = new Fighter(UUID.randomUUID(), "Alex", "Smith", 1L, 1L);
        given(fighterService.fighterIdExists(fighter.getId())).willReturn(false);

        //when & then
        mockMvc.perform(get("/actors/fighters/id/" + fighter.getId())
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    void deleteFighterFound() throws Exception {
        //given
        UUID id = UUID.randomUUID();
        given(fighterService.fighterIdExists(id)).willReturn(true);

        //when & then
        mockMvc.perform(delete("/actors/fighters/delete/" + id)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", is(true)));
    }

    @Test
    void deleteFighterNotFound() throws Exception {
        //given
        UUID id = UUID.randomUUID();
        given(fighterService.fighterIdExists(id)).willReturn(false);

        //when & then
        mockMvc.perform(delete("/actors/fighters/delete/" + id)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}
