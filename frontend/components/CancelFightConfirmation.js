import React, { useState } from 'react';
import Api from './util/Api';
import FormHeaderLink from './util/FormHeaderLink';
import { Flex, Center, Button, Text, ScrollView, Heading } from 'native-base';
import { Navigate, useLocation } from "react-router-native";
import { FontAwesome } from '@expo/vector-icons';

const CancelFightConfirmation = () => {

    const props = useLocation({});
    const [cancelled, setCancelled] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const deleteFight = () => {
        Api.delete('/matches/cancel/' + props.state.fightId
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
            <FormHeaderLink pathname="fightInfo" state={{ fightId: props.state.fightId }} name="Cancel Fight" />
            <ScrollView>
                <Center>

                    <Heading marginBottom={25} marginTop={25}>
                        Delete following fight?
                    </Heading>

                    {/* Fight date-time */}
                    <Flex direction="row">
                        <FontAwesome name="calendar" size={28} color="black" />
                        <Text marginLeft={5} color="black" fontSize={22} fontWeight="bold">
                            {props.state.date}
                        </Text>
                    </Flex>

                    {/* Fighter1 vs Fighter2 */}
                    <Flex
                        direction="row"
                        marginTop="15px"
                        rounded="lg"
                        borderColor="black"
                        borderWidth="1"
                        p="4px"
                    >
                        <FontAwesome name="user-circle" size={28} color="black" />
                        <Text marginLeft={5} color="black" fontSize={20} fontWeight="bold">
                            {props.state.fighter1}
                        </Text>
                    </Flex>
                    <Text
                        marginTop="5px"
                        marginBottom="5px"
                        color="black"
                        fontSize={22}
                        fontWeight="bold"
                    >
                        VS
                    </Text>
                    <Flex
                        direction="row"
                        rounded="lg"
                        borderColor="black"
                        borderWidth="1"
                        p="4px"
                    >
                        <FontAwesome name="user-circle" size={28} color="black" />
                        <Text marginLeft={5} color="black" fontSize={20} fontWeight="bold">
                            {props.state.fighter2}
                        </Text>
                    </Flex>

                    {/* Cancell button */}
                    <Button marginTop="30px" colorScheme="gray"
                        onPress={cancel}>
                        <Text color="white" p="0px" m="0px">Cancel</Text>
                    </Button>

                    {/* Delete button */}
                    <Button marginTop="5px" colorScheme="red"
                        onPress={() => {
                            deleteFight();
                        }}>
                        <Text color="white" >Delete</Text>
                    </Button>
                </Center>
            </ScrollView>
            {deleted && <Navigate to="/matchList"></Navigate>}
            {cancelled && <Navigate to="/fightInfo" state={{ fightId: props.state.fightId }} ></Navigate>}


            {/* Here footer component containing administrator's navigation bar */}
        </>
    );
};

export default CancelFightConfirmation;
