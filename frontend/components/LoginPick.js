import FormHeader from './util/FormHeader';
import { Center, Button, VStack, Text } from 'native-base';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
const LoginPick = () => {
    return (
        <>
            <FormHeader name="Login Screen"></FormHeader>
            <Center>
                <FontAwesome name="handshake-o" size={200}></FontAwesome>

                <Text marginBottom="10px" color="black" fontSize={20} fontWeight="bold">
                    Join as
                </Text>

                <VStack>
                    <Button
                        onPress={() => {}}
                        marginTop="30px"
                        size="lg"
                        marginRight="30px"
                        marginLeft="30px"
                        bg="#059669"
                        _text={{
                            color: 'white',
                        }}
                    >
                        Main Referee
                    </Button>
                    <Button
                        onPress={() => {}}
                        marginTop="30px"
                        size="lg"
                        marginRight="30px"
                        marginLeft="30px"
                        bg="#059669"
                        _text={{
                            color: 'white',
                        }}
                    >
                        Side Referee
                    </Button>
                    <Button
                        onPress={() => {}}
                        marginTop="30px"
                        size="lg"
                        marginRight="30px"
                        marginLeft="30px"
                        bg="#059669"
                        _text={{
                            color: 'white',
                        }}
                    >
                        Organizer
                    </Button>
                </VStack>
            </Center>
        </>
    );
};

export default LoginPick;
