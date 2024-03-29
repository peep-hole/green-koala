import React, { useEffect, useState } from 'react';
import FormHeader from './util/FormHeader';
import MainRefereeFooter from './util/MainRefereeFooter';
import DisplayScore from './DisplayScore';
import { HStack, VStack, Text, Center, Box, FlatList } from 'native-base';
import { useLocation } from "react-router-native"
import Api from './util/Api';


const FightHistory = () => {

    const props = useLocation({});
    const [events, setEvents] = useState([]);
    const [eventsLoaded, setEventsLoaded] = useState(false);

    const getMatchEvents = () => {
        Api.get('/status/'+props.state.matchData.id
        ).then(res => {
            setEvents(res.data.acceptedDecisions);
            setEventsLoaded(true);
        }).catch(e => {
            console.log(e);
        })
    }

    useEffect(() => {
        getMatchEvents();
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
                                    <Text color="white">{props.state.fighter1.name + ' ' + props.state.fighter1.surname}</Text>
                                </Center>
                            </Box>
                            <Box bg="blue.500" p="5px" width="50%" borderColor="black" borderWidth="1" height="40px">
                            <Center>
                                    <Text color="white">{props.state.fighter2.name + ' ' + props.state.fighter2.surname}</Text>
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
                    {
                    eventsLoaded && 
                    <Box height={"250"}>
                    <FlatList backgroundColor="gray.200"
                        data={events} renderItem={
                            ({ item }) =>
                                <Box key={item.decision + item.fighter1Points + item.fighter2Points} borderBottomWidth={1} borderTopWidth={1} _dark={{ borderColor: "gray.800" }} borderColor="coolGray.400" pl="4" pr="5" py="2">
                                    <VStack space={3} justifyContent="space-between">
                                        <Text _dark={{ color: "warmGray.50" }} color="coolGray.800" bold>
                                            Main:
                                        </Text>
                                        <Text _dark={{ color: "warmGray.50" }} color="coolGray.800">
                                            {item.decision}
                                        </Text>
                                        {!!item.fighter1Points &&
                                            <Text _dark={{ color: "warmGray.50" }} color="coolGray.800">
                                                {item.fighter1Points} for red
                                            </Text>
                                        }
                                        {!!item.fighter2Points &&
                                            <Text _dark={{ color: "warmGray.50" }} color="coolGray.800">
                                                {item.fighter2Points} for blue
                                            </Text>
                                        }
                                    </VStack>
                                </Box>
                        } keyExtractor={item => item.eventID} />
                        </Box>
                    }
                </Box>

            </Center >

            <MainRefereeFooter selected={0}
                state={{
                    matchData: props.state.matchData,
                    fighter1: props.state.fighter1,
                    fighter2: props.state.fighter2,
                    fighter1Score: props.state.fighter1Score,
                    fighter2Score: props.state.fighter2Score,
                    userType: props.state.userType,
                    token: props.state.token
                }}>
            </MainRefereeFooter>
        </>
    );
};

export default FightHistory;