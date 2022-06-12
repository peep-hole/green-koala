import React, { useEffect, useState } from 'react';
import FormHeaderLink from '../util/FormHeaderLink';
import { Button, Center, Flex, Text, ScrollView } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { Navigate } from 'react-router-native';
import { useLocation } from 'react-router-native';
import { MaterialIcons } from '@expo/vector-icons';


const TournamentInfo = () => {

    const props = useLocation();
    const [tournamentCancelling, setTournamentCancelling] = useState(false);

    useEffect(() => {

    }, []);

    const cancelFight = () => {
        setTournamentCancelling(true);
    };

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

                    {/* Rules, TODO: add tournaments rules */}
                    <Text marginTop="20px" color="black" fontSize={18} fontWeight="bold">
                        Rules:
                    </Text>
                    <Text marginLeft="35px" marginRight="40px" color="grey" fontSize={15}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry`&apos;`s standard dummy text ever since
                        the{' '}
                    </Text>

                    <Text margin="30px" color="black" fontSize={18} fontWeight="bold">
                        HERE DONE TOURNAMENT BRACKET
                        click match - link to FightResult?
                    </Text>

                    {/* Tournament cancelling button*/}
                    <Button marginTop="30px" colorScheme="red" onPress={cancelFight}>
                        <Text>Cancel Tournament</Text>
                    </Button>
                </Center>
            </ScrollView>

            {tournamentCancelling && (
                <Navigate to="/cancelTournament" state={{tournament: props.state.tournament }}></Navigate>
            )}
        </>
    );
};

export default TournamentInfo;
