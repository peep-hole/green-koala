import React, {useState} from 'react';
import FormHeaderLink from "../util/FormHeaderLink";
import {Button, Center, Flex, Heading, HStack, ScrollView, Text} from "native-base";
import {FontAwesome} from "@expo/vector-icons";
import {Navigate, useLocation} from "react-router-native";

const DeleteTournamentConfirmation = () => {

    const props = useLocation();
    const [cancelled, setCancelled] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const deleteTournament = () => {
        // LALALALA ENDPOINTY
        setDeleted(true)
        console.log("Tournament deleted.")
    }

    const cancel = () => {
        setCancelled(true)
    }

    return (
        <>
            <FormHeaderLink pathname="fighterList" state={{}} name="Delete Fighter" />
            <ScrollView>
                <Center>
                    <Heading marginBottom={25} marginTop={25}>
                        Delete following tournament?
                    </Heading>

                    <Flex direction="row" marginTop="15px" rounded="lg" borderColor="black" borderWidth="1" p="10px">
                        <FontAwesome name="user-circle" size={28} color="black" />
                        <Text marginLeft={5} color="black" fontSize={20} fontWeight="bold">
                            {props.state.tournamentData.name}
                        </Text>
                    </Flex>
                    <Text textAlign="center" width="75%" marginTop="10px">
                        Are you sure you want to delete tournament?
                        It is not possible to restore fighter data after removing.
                    </Text>
                    <HStack marginTop="30px" p="10px">
                        {/* Cancell button */}
                        <Button colorScheme="gray"
                                onPress={cancel}>
                            <Text color="white" p="0px" m="0px">Cancel</Text>
                        </Button>

                        {/* Delete button */}
                        <Button colorScheme="red" marginLeft="20px"
                                onPress={() => {
                                    deleteTournament();
                                }}>
                            <Text color="white" >Delete</Text>
                        </Button>
                    </HStack>

                </Center>
            </ScrollView>
            {(deleted || cancelled) && <Navigate to="/tournamentList"/>}
        </>
    );
};

export default DeleteTournamentConfirmation;