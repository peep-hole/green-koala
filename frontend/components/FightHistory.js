import React, { useEffect, useState } from 'react';
import FormHeader from './util/FormHeader';
import MainRefereeFooter from './util/MainRefereeFooter';
import DisplayScore from './DisplayScore';
import { HStack, VStack, Text, Center, Box, FlatList, Spacer } from 'native-base';
import { useLocation } from "react-router-native"
import Api from './util/Api';


const FightHistory = () => {

    const props = useLocation({});
    const [events, setEvents] = useState([]);
    const [eventsLoaded, setEventsLoaded] = useState(false);

    const getMatchEvents = () => {
        Api.get('/proper/endpoint/match/{id}' //TODO: special endpoint for getting match events
        ).then(res => {
            setEvents(res.data);
            // console.log(res.data);
            setEventsLoaded(true);
        }).catch(e => {
            console.log(e);
        })
    }

    useEffect(() => {
        getMatchEvents();
        setEvents([
            {
                eventID: "1234324",
                time: "00:12",
                referee: "Side referee 1",
                decision: "RED: attack, hit, 2 points IDK."
            },
            {
                eventID: "1243543",
                time: "01:00",
                referee: "Side referee 2",
                decision: "BLUE: defense, miss, 0 points IDK. RED: attack, hit, 1 points IDK."
            },
            {
                eventID: "12342344",
                time: "01:34",
                referee: "Main referee",
                decision: "RED: attack, hit, 2 points IDK."
            },
            {
                eventID: "1213123324",
                time: "02:33",
                referee: "Main referee",
                decision: "BLUE: defense, miss, 0 points IDK."
            },
        ])
        // console.log(events);
    }, [])

    return (
        <>
            <FormHeader name="Fight History"></FormHeader>
            <Center>
                <VStack width="90%">
                    <Center>
                        <HStack width="100%" mb="20px">
                            <Box bg="red.500" p="5px" width="50%" borderColor="black" borderWidth="1" height="40px">
                                <Center>
                                    <Text color="white">{props.state.fighter1}</Text>
                                </Center>
                            </Box>
                            <Box bg="blue.500" p="5px" width="50%" borderColor="black" borderWidth="1" height="40px">
                                <Center>
                                    <Text color="white">{props.state.fighter2}</Text>
                                </Center>
                            </Box>
                        </HStack>

                        <DisplayScore
                            fighter1Score={props.state.fighter1Score}
                            fighter2Score={props.state.fighter2Score}>
                        </DisplayScore>

                    </Center>
                </VStack>

                <Box id="oncoming_matches" height="auto" width="90%">
                    <Center>
                        <Text fontSize={20} marginBottom={3}>
                            Event decisions
                        </Text>
                    </Center>
                    {/* TODO: update filtering when model will contain bool determining if fight is over / or maybe score is not null? */}
                    <FlatList backgroundColor="gray.200"
                        data={events} renderItem={
                            ({ item }) =>
                                <Box borderBottomWidth={1} borderTopWidth={1} _dark={{ borderColor: "gray.800" }} borderColor="coolGray.400" pl="4" pr="5" py="2">
                                    <HStack space={3} justifyContent="space-between">
                                        <Text _dark={{ color: "warmGray.50" }} color="coolGray.800" bold>
                                            {item.referee + ": "}
                                        </Text>
                                        <Spacer />
                                        <Text fontSize="xs" _dark={{ color: "warmGray.50" }} color="coolGray.800" alignSelf="flex-start">
                                            {item.time}
                                        </Text>
                                    </HStack>
                                    <Text _dark={{ color: "warmGray.50" }} color="coolGray.800" alignSelf="center">
                                        {item.decision}
                                    </Text>
                                </Box>
                        } keyExtractor={item => item.eventID} />
                </Box>

            </Center >

            <MainRefereeFooter selected={0}
                state={{
                    fighter1: props.state.fighter1,
                    fighter2: props.state.fighter2,
                    fighter1Score: props.state.fighter1Score,
                    fighter2Score: props.state.fighter2Score,
                    userType: props.state.userType

                }}>
            </MainRefereeFooter>
        </>
    );
};

export default FightHistory;