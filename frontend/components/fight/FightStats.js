import React from 'react';
import FormHeader from '../util/FormHeader';
import MainRefereeFooter from '../util/MainRefereeFooter';
import DisplayScore from '../DisplayScore';
import {Box, Center, HStack, Text, VStack} from 'native-base';
import {useLocation} from "react-router-native"


const FightStats = () => {

    const props = useLocation({});

    return (
        <>
            <FormHeader name="Fight Statistics"></FormHeader>
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

                <Text marginTop={50} fontSize={25}>
                    STATS COMPONENT HERE
                </Text>

            </Center>

            <MainRefereeFooter selected={2}
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

export default FightStats;