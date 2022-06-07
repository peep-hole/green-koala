import React, { useState } from 'react';
import Api from './util/Api';
import FormHeaderLink from './util/FormHeaderLink';
import { HStack, Flex, Center, Button, Text, ScrollView, Heading } from 'native-base';
import { Navigate, useLocation } from "react-router-native";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

const CancelTournamentConfirmation = () => {

    const props = useLocation({});
    const [cancelled, setCancelled] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const deleteTournament = () => {
        Api.delete('/tournaments/cancel/' + props.state.tournament.id
        ).then(() => {
            setDeleted(true);
        }).catch(e => {
            console.log(e)
        })
    }

    const cancel = () => {
        setCancelled(true)
    }

    return (
        <>
            <FormHeaderLink pathname="tournamentInfo" state={{ tournament: props.state.tournament }} name="Cancel Tournament" />
            <ScrollView>
                <Center>

                    <Heading marginBottom={25} marginTop={25}>
                        Delete following tournament?
                    </Heading>

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
                    <HStack marginTop="30px" p="10px">
                        {/* Cancell button */}
                        <Button colorScheme="gray"
                            onPress={cancel}>
                            <Text color="white" p="0px" m="0px">Cancel</Text>
                        </Button>

                        {/* Delete button */}
                        <Button marginLeft="20px" colorScheme="red"
                            onPress={() => {
                                deleteTournament();
                            }}>
                            <Text color="white" >Delete</Text>
                        </Button>
                    </HStack>
                </Center>
            </ScrollView>
            {deleted && <Navigate to="/tournamentList"></Navigate>}
            {cancelled && <Navigate to="/tournamentInfo" state={{ tournament: props.state.tournament }} ></Navigate>}


            {/* Here footer component containing administrator's navigation bar */}
        </>
    );
};

export default CancelTournamentConfirmation;
