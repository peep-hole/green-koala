import React, {useEffect} from 'react';
import FormHeaderLink from './util/FormHeaderLink';
import {Center, Flex, ScrollView, Text} from 'native-base';
import {FontAwesome, MaterialIcons} from '@expo/vector-icons';
import {useLocation} from 'react-router-native';


const TournamentResult = () => {

    const props = useLocation();

    useEffect(() => {

    }, []);

    return (
        <>
            <FormHeaderLink pathname="tournamentList" state={{}} name="Tournament Details" />
            <ScrollView>
                <Center>
                    {/* Tournament date-time */}
                    <Flex direction="row">
                        <FontAwesome name="calendar" size={28} color="black" />
                        <Text marginLeft={5} color="black" fontSize={22} fontWeight="bold">
                            {props.state.tournament.date}
                        </Text>
                    </Flex>

                    {/* Title */}
                    <Flex direction="row" marginTop="15px" rounded="lg" borderColor="black" borderWidth="1" p="4px">
                        <MaterialIcons name="emoji-events" size={28} color="black" />
                        <Text marginLeft={5} color="black" fontSize={20} fontWeight="bold">
                            {props.state.tournament.title}
                        </Text>
                    </Flex>

                    <Text margin="30px" color="black" fontSize={18} fontWeight="bold">
                        HERE DONE TOURNAMENT BRACKET
                        click match - link to FightResult?
                    </Text>

                    <Text marginTop={50} fontSize={25}>
                        RESULT COMPONENT HERE
                    </Text>
                </Center>
            </ScrollView>
        </>
    );
};

export default TournamentResult;
