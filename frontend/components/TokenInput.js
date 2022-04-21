import React, { useEffect, useState } from 'react';
import { Input, NativeBaseProvider, Text, Center, Button, VStack } from 'native-base';
import FormHeader from './util/FormHeader';

const MainRefereeTokenInput = props => {
    const [userType, setUserType] = useState('');

    //we can set things like routes on button click depending on the type later
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
            <Center marginTop="150px">
                <Text fontSize="20">Dołączasz do spotkania jako</Text>
                <Text fontWeight="bold" fontSize="30">
                    {userType}
                </Text>
                <VStack width="90%">
                    <Input marginTop="20px" placeholder="Podaj kod spotkania"></Input>
                    <Button marginTop="20px" marginRight="50px" marginLeft="50px">
                        Dołącz
                    </Button>
                </VStack>
            </Center>
        </>
    );
};

export default MainRefereeTokenInput;
