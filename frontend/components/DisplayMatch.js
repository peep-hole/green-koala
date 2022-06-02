import React, { useEffect, useState } from 'react';
import { HStack, VStack, Text, Button, Center, Box, View } from 'native-base';
import DisplayScore from './DisplayScore';
import Timer from "./Timer";
import {over} from "stompjs"
import SockJS from 'sockjs-client';
import url from './util/Websocket';
import MainRefereeFooter from './util/MainRefereeFooter';
import { useLocation, useNavigate } from 'react-router-native';
import Api from './util/Api';

let sock = null;
let stompClient = null;

const navigateToPointPick = (
    fighter,
    fighterName,
    isMainReferee,
    token,
    points1,
    points2,
    fighter1,
    fighter2,
    matchData,
    userType,
    navigate
) => {
    const state = {
        fighter: fighter,
        fighterName: fighterName,
        isMainReferee: isMainReferee,
        token: token,
        points1: points1,
        points2: points2,
        fighter1: fighter1,
        fighter2: fighter2,
        matchData: matchData,
        userType: userType,
    };
    navigate('/suggestPoints', { state: { state } });
};

const DisplayMatch = () => {
    const props = useLocation();
    console.log(props)
    const navigate = useNavigate();
    const [sideDecisions, setSideDecisions] = useState({
        side1: "",
        side2: "",
    })
    const { id } = props.state.matchData;
    const [fighterScore1, setFighter1Score] = useState(0);
    const [fighterScore2, setFighter2Score] = useState(0);

    useEffect(() => {
        sock = new SockJS(url);
        stompClient = over(sock);
        stompClient.connect({}, onConnected, onError);
        Api.post(`status/${id}/start`, {})
        .then(() => console.log("START"))
        .catch(e => e.printStackTrace());
    }, []);

    const onConnected = () => {
        stompClient.subscribe("/response/status", () => {
            Api.get(`/status/${props.state.matchData.id}`
            ).then(res => {
                console.log(res.data)
                const {referee1Decision, referee2Decision, fighter1Points, fighter2Points} = res.data;

                setFighter1Score(fighter1Points);
                setFighter2Score(fighter2Points);

                if(referee1Decision.decision){
                    setSideDecisions(decision => ({
                        ...decision,
                        side1: referee1Decision.decision.toString(),
                    }))
                }

                if(referee2Decision.decision){
                    setSideDecisions(decision => ({
                        ...decision,
                        side2: referee2Decision.decision.toString(),
                    }))
                }

            }).catch(e => {
                console.log(e)
            })
        })
    }

    const onError = (error) => {
        console.log("Error: " + error);
    }

    return (
        <View height="100%">
            <Box safeAreaTop bg="#065f46" />
            {/* maxTime={props.state.matchData.matchRules.maxTime}  will be set when matchRules appear in get match by ID- so far only in match status*/}
            <Timer isMain={props.state.userType === 'Main'} maxTime="00:30" />
            <Center height="70%" marginTop={5}>
                <VStack width="90%">
                    <Center>
                        <HStack width="100%" mb="20px">
                            <Box
                                bg="red.500"
                                p="5px"
                                width="50%"
                                borderColor="black"
                                borderWidth="1"
                                height="40px"
                            >
                                <Center>
                                    <Text color="white">
                                        {props.state.fighter1.name +
                                            ' ' +
                                            props.state.fighter1.surname}
                                    </Text>
                                </Center>
                            </Box>
                            <Box
                                bg="blue.500"
                                p="5px"
                                width="50%"
                                borderColor="black"
                                borderWidth="1"
                                height="40px"
                            >
                                <Center>
                                    <Text color="white">
                                        {props.state.fighter2.name +
                                            ' ' +
                                            props.state.fighter2.surname}
                                    </Text>
                                </Center>
                            </Box>
                        </HStack>

                        <DisplayScore
                            fighter1Score={fighterScore1}
                            fighter2Score={fighterScore2}
                        ></DisplayScore>

                        <Box bg="gray.300" mb="20px" width="100%" height="30%">
                            <VStack>
                                <Box p="10px" width="100%">
                                    <Box width="100%" borderColor="black" borderWidth={1}>
                                        <Text fontSize="16px" p="10px">{`Referee1: ${sideDecisions.side1}`}</Text>
                                        <Box width="100%" pt="10px" height="15px" bgColor={"blue.500"} />
                                    </Box>
                                </Box>
                                <Box p="10px" width="100%">
                                    <Box width="100%" borderColor="black" borderWidth={1}>
                                        <Text fontSize="16px" p="10px">{`Referee2: ${sideDecisions.side2}`}</Text>
                                        <Box width="100%" pt="10px" height="15px" bgColor={"red.500"} />
                                    </Box>
                                </Box>
                            </VStack>
                        </Box>

                        <VStack width="100%">
                            <Center>
                                <HStack width="100%">
                                    <Button
                                        width="50%"
                                        p="20px"
                                        mb="2px"
                                        bg="red.500"
                                        onPress={() => {
                                            console.log(props.state.token)
                                            navigateToPointPick(
                                                1,
                                                props.state.fighter1.name +
                                                    ' ' +
                                                    props.state.fighter1.surname,
                                                props.state.userType === 'Main',
                                                props.state.token,
                                                fighterScore1,
                                                fighterScore2,
                                                props.state.fighter1,
                                                props.state.fighter2,
                                                props.state.matchData,
                                                props.state.userType,
                                                navigate
                                            );
                                        }}
                                    >
                                        RED point
                                    </Button>
                                    <Button
                                        width="50%"
                                        p="20px"
                                        mb="2px"
                                        bg="blue.500"
                                        n
                                        onPress={() => {
                                            console.log(props.state.token)
                                            navigateToPointPick(
                                                2,
                                                props.state.fighter2.name +
                                                    ' ' +
                                                    props.state.fighter2.surname,
                                                props.state.userType === 'Main',
                                                props.state.token,
                                                fighterScore1,
                                                fighterScore2,
                                                props.state.fighter1,
                                                props.state.fighter2,
                                                props.state.matchData,
                                                props.state.userType,
                                                navigate
                                            );
                                        }}
                                    >
                                        BLUE point
                                    </Button>
                                </HStack>
                            </Center>

                            <Center>
                                <Button
                                    bg="gray.500"
                                    width="100%"
                                    onPress={() => {
                                        console.log(props.state.token)
                                        navigateToPointPick(
                                            0,
                                            ' ',
                                            props.state.userType === 'Main',
                                            props.state.token,
                                            fighterScore1,
                                            fighterScore2,
                                            props.state.fighter1,
                                            props.state.fighter2,
                                            props.state.matchData,
                                            props.state.userType,
                                            navigate
                                        );
                                    }}
                                >
                                    No point
                                </Button>
                            </Center>
                        </VStack>
                    </Center>
                </VStack>
            </Center>

            {props.state.userType == 'Main' && (
                <MainRefereeFooter
                    selected={1}
                    state={{
                        matchData: props.state.matchData,
                        fighter1: props.state.fighter1,
                        fighter2: props.state.fighter2,
                        fighter1Score: fighterScore1,
                        fighter2Score: fighterScore2,
                        userType: props.state.userType,
                    }}
                ></MainRefereeFooter>
            )}
        </View>
    );
};

export default DisplayMatch;
