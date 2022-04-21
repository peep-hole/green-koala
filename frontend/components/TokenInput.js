import React, { useEffect, useState } from 'react';
import { Input, NativeBaseProvider, Text, Center, Button, VStack } from 'native-base';
import FormHeader from './util/FormHeader';
import { FontAwesome } from '@expo/vector-icons';

//example call for App.js - <TokenInput userType="Organizer" />

const MainRefereeTokenInput = props => {
    const [userType, setUserType] = useState('');
    const [error, setError] = useState(false);
    const [clickAction, setClickAction] = useState(() => () => {
        setError(false);
        console.log('Mock sent token to backend');
        setError(true);
    });

    //we can set things like routes on button click depending on the type later
    //my idea - get match data from token here and pass it as a prop to the next screen, otherwise show error if i.e. token does not exist

    useEffect(() => {
        switch (props.userType) {
            case 'Main':
                setUserType('Sędzia Główny');
                break;
            case 'Side':
                setUserType('Sędzia Boczny');
                break;
            case 'Organizer':
                setUserType('Organizator');
                break;
            default:
                setUserType("We don't have that one, sorry");
        }
    });

    return (
        <>
            <FormHeader name="Token"></FormHeader>
            <Button
                marginBottom="150px"
                width="50"
                marginLeft={30}
                bg="#059669"
                text={{
                    color: 'white',
                }}
            >
                <FontAwesome name="arrow-circle-left" size={30} color="white"></FontAwesome>
            </Button>
            <Center>
                <Text fontSize="20">Dołączasz do spotkania jako</Text>
                <Text fontWeight="bold" fontSize="30">
                    {userType}
                </Text>
                <VStack width="90%">
                    <Input marginTop="20px" placeholder="Podaj kod spotkania"></Input>
                    <Button
                        marginTop="20px"
                        marginRight="50px"
                        marginLeft="50px"
                        bg="#059669"
                        onPress={clickAction}
                    >
                        Dołącz
                    </Button>
                    <Text color="red.500">
                        {error &&
                            'Unable to join the match, please check the token and try again'}
                    </Text>
                </VStack>
            </Center>
        </>
    );
};

export default MainRefereeTokenInput;
