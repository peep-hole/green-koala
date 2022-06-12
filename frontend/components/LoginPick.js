import FormHeader from './util/FormHeader';
import {Button, Center, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {FontAwesome} from '@expo/vector-icons';
import {Navigate} from 'react-router-native';

const LoginPick = () => {


    const [user, setUser] = useState("");
    const [userTypePicked, setUserTypePicked] = useState(false);


    return (
        <>
            <FormHeader name="Login Screen"></FormHeader>
            <Center>
                <FontAwesome name="handshake-o" size={200}></FontAwesome>

                <Text marginBottom="10px" color="black" fontSize={20} fontWeight="bold">
                    Join as
                </Text>

                <VStack>
                    <Button marginTop="30px" size="lg" marginRight="30px" marginLeft="30px" bg="#059669" _text={{ color: 'white', }}
                        onPress={() => {
                            setUser("Main");
                            setUserTypePicked(true);
                        }}>
                        <Text>Main Referee</Text>
                    </Button>

                    <Button marginTop="30px" size="lg" marginRight="30px" marginLeft="30px" bg="#059669" _text={{ color: 'white', }}
                        onPress={() => {
                            setUser("Side");
                            setUserTypePicked(true);
                        }}>
                        <Text>Side Referee</Text>
                    </Button>

                    <Button marginTop="30px" size="lg" marginRight="30px" marginLeft="30px" bg="#059669" _text={{ color: 'white', }}
                        onPress={() => {
                            setUser("Organizer");
                            setUserTypePicked(true);
                        }}>
                        <Text> Organizer</Text>
                    </Button>
                </VStack>
            </Center>
            {userTypePicked && <Navigate to="/tokenInput" state={{ userType: user }}></Navigate>}

        </>
    );
};

export default LoginPick;
