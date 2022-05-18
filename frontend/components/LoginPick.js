import FormHeader from './util/FormHeader';
import { Center, Button, VStack, Text } from 'native-base';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'react-router-native';

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
                    <Button marginTop="30px" size="lg" marginRight="30px" marginLeft="30px" bg="#059669" _text={{ color: 'white', }}>
                        <Link to="/tokenInput" state={{ userType: "Main" }}>
                            <Text>
                                Main Referee
                            </Text>
                        </Link>
                    </Button>

                    <Button marginTop="30px" size="lg" marginRight="30px" marginLeft="30px" bg="#059669" _text={{ color: 'white', }}>
                        <Link to="/tokenInput" state={{ userType: "Side" }}>
                            <Text>
                                Side Referee
                            </Text>
                        </Link>
                    </Button>
                    <Button marginTop="30px" size="lg" marginRight="30px" marginLeft="30px" bg="#059669" _text={{ color: 'white', }}>
                        <Link to="/tokenInput" state={{ userType: "Organizer" }}>
                            <Text>
                                Organizer
                            </Text>
                        </Link>
                    </Button>
                </VStack>
            </Center>
        </>
    );
};

export default LoginPick;
