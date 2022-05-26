import React, { useEffect } from 'react';
import { HStack, VStack, Text, Button, Center, Box, View } from 'native-base';
import DisplayScore from './DisplayScore';
import Timer from './Timer';
import MainRefereeFooter from './util/MainRefereeFooter';
import { useLocation, useNavigate } from 'react-router-native';

const fighterScore1 = 3;
const fighterScore2 = 2;

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

    useEffect(() => {
        console.log('passed to displaymatch:');
        console.log(props.state.matchData);
        console.log(props.state.fighter1);
        console.log(props.state.fighter2);
        console.log('Joined match as:');
        console.log(props.state.userType);
    }, []);

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
                                <Center>
                                    <Text>event1 placeholder</Text>
                                </Center>
                                <Center>
                                    <Text>event2 placeholder</Text>
                                </Center>
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
                    }}
                ></MainRefereeFooter>
            )}
        </View>
    );
};

export default DisplayMatch;
