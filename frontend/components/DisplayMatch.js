import React, { useEffect, useState } from 'react';
import { HStack, VStack, Text, Button, Center, Box, View, Modal, ScrollView } from 'native-base';
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
    const navigate = useNavigate();
    const [sideDecisions, setSideDecisions] = useState({
        side1: "",
        side2: "",
        side1Points: 0,
        side2Points: 0
    })
    const { id } = props.state.matchData;
    const [fighterScore1, setFighter1Score] = useState(0);
    const [fighterScore2, setFighter2Score] = useState(0);
    const [sideBarsColors, setSideBarsColors] = useState({
        side1: "gray.500",
        side2: "gray.500",
    })
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        sock = new SockJS(url);
        stompClient = over(sock);
        stompClient.connect({}, onConnected, onError);
        Api.post(`status/${id}/start`, {})
        .then(() => console.log("START"))
        .catch(e => e.printStackTrace());
    }, []);

    const switchColor = (decision) => {
        const {fighter1Points, fighter2Points} = decision
        if(fighter1Points) return "red.500";
        if(fighter2Points) return "blue.500";
        return "gray.500";
    }

    const onConnected = () => {
        Api.get(`/status/${props.state.matchData.id}`
            ).then(res => {
                const {referee1Decision, referee2Decision, fighter1Points, fighter2Points} = res.data;

                if(fighter1Points) setFighter1Score(fighter1Points);
                if(fighter2Points) setFighter2Score(fighter2Points);

                if(referee1Decision.decision){
                    setSideDecisions(decision => ({
                        ...decision,
                        side1: referee1Decision.decision.toString(),
                        side1Points: referee1Decision.fighter1Points || referee1Decision.fighter2Points
                    }))
                    setSideBarsColors(oldColors => ({
                        ...oldColors,
                        side1: switchColor(referee1Decision)
                    }))
                }

                if(referee2Decision.decision){
                    setSideDecisions(decision => ({
                        ...decision,
                        side2: referee2Decision.decision.toString(),
                        side2Points: referee2Decision.fighter1Points || referee2Decision.fighter2Points
                    }))
                    setSideBarsColors(oldColors => ({
                        ...oldColors,
                        side2: switchColor(referee2Decision)
                    }))
                }

            }).catch(e => {
                console.log(e)
            })
        stompClient.subscribe("/response/status", () => {
            Api.get(`/status/${props.state.matchData.id}`
            ).then(res => {
                const {referee1Decision, referee2Decision, fighter1Points, fighter2Points} = res.data;

                if(fighter1Points) setFighter1Score(fighter1Points);
                if(fighter2Points) setFighter2Score(fighter2Points);

                if(referee1Decision.decision){
                    setSideDecisions(decision => ({
                        ...decision,
                        side1: referee1Decision.decision.toString(),
                        side1Points: referee1Decision.fighter1Points || referee1Decision.fighter2Points
                    }))
                    setSideBarsColors(oldColors => ({
                        ...oldColors,
                        side1: switchColor(referee1Decision)
                    }))
                }

                if(referee2Decision.decision){
                    setSideDecisions(decision => ({
                        ...decision,
                        side2: referee2Decision.decision.toString(),
                        side2Points: referee2Decision.fighter1Points || referee2Decision.fighter2Points
                    }))
                    setSideBarsColors(oldColors => ({
                        ...oldColors,
                        side2: switchColor(referee2Decision)
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

    const isSide1 = () => {
        return props.state.token === props.state.matchData.sideRefereeToken1
    }

    const resetDecision = () => {
        Api.post(`status/${id}/decision`, {
            fighter1Points: 0, 
            fighter2Points: 0, 
            decision: [],
            refereeToken: props.state.token
        })
        .then(() => setShowModal(false))
        .catch(e => {
            console.log(e)
        });
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

                        {props.state.userType === 'Main'  
                        ? <Box bg="gray.300" mb="20px" width="100%" height="160px">
                            <VStack>
                                <Box p="10px" width="100%">
                                    <Box width="100%" borderColor="black" borderWidth={1} height="60px">
                                        <ScrollView>
                                        <VStack justifyContent="space-between">
                                            <Text fontSize="16px" p="10px">{`Referee1: ${sideDecisions.side1}`}</Text>
                                            <Text fontSize="16px" p="10px">{`${sideDecisions.side1Points} points`}</Text>
                                        </VStack>
                                        </ScrollView>
                                        <Box width="100%" pt="10px" height="15px" bgColor={sideBarsColors.side1} />
                                    </Box>
                                </Box>
                                <Box p="10px" width="100%">
                                    <Box width="100%" borderColor="black" borderWidth={1} height="60px">
                                        <ScrollView>
                                        <VStack justifyContent="space-between">
                                            <Text fontSize="16px" p="10px">{`Referee2: ${sideDecisions.side2}`}</Text>
                                            <Text fontSize="16px" p="10px">{`${sideDecisions.side2Points} points`}</Text>
                                        </VStack>
                                        </ScrollView>
                                        <Box width="100%" pt="10px" height="15px" bgColor={sideBarsColors.side2} />
                                    </Box>
                                </Box>
                            </VStack>
                        </Box>
                        :
                        <Box bg="gray.300" mb="20px" width="100%" height="100px">
                            <Box p="10px" width="100%">
                                <Box width="100%" borderColor="black" borderWidth={1} position="relative">
                                    <VStack maxHeight="60px">
                                        <ScrollView>
                                            <Text fontSize="16px" p="10px">{`Your decision: ${isSide1() ? sideDecisions.side1 : sideDecisions.side2}`}</Text>
                                            <Text fontSize="16px" p="10px">{`${isSide1() ? sideDecisions.side1Points : sideDecisions.side2Points} points`}</Text>
                                            <Button bg="gray.300" width={10} height={10} position="absolute" top="0" right="0"
                                                onPress={() => setShowModal(true)}>
                                                <Text color="black" p="0">X</Text>
                                            </Button>
                                        </ScrollView>
                                    </VStack>
                                    <Box width="100%" pt="10px" height="15px" bgColor={isSide1() ? sideBarsColors.side1 : sideBarsColors.side2} />
                                </Box>
                            </Box>
                        </Box>
                        }

                        <VStack width="100%">
                            <Center>
                                <HStack width="100%">
                                    <Button
                                        width="50%"
                                        p="20px"
                                        mb="2px"
                                        bg="red.500"
                                        onPress={() => {
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
                        token: props.state.token
                    }}
                ></MainRefereeFooter>
            )}

            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <Modal.Content>
                    <Modal.CloseButton></Modal.CloseButton>
                    <Modal.Header>Undo event confirmation</Modal.Header>
                    <Modal.Body>
                        <Text>
                            Are you sure you want to cancel your decision?
                        </Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button
                                variant="ghost"
                                colorScheme="blueGray"
                                onPress={() => {setShowModal(false)}}
                            >
                                <Text>No</Text>
                            </Button>
                            <Button onPress={resetDecision}>
                                <Text>Yes</Text>
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
        </View>
    );
};

export default DisplayMatch;
