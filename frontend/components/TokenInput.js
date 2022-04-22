import React, { useEffect, useState } from 'react';
import { Input, NativeBaseProvider, Text, Center, Button, VStack } from 'native-base';
import FormHeader from './util/FormHeader';
import { FontAwesome } from '@expo/vector-icons';
import Api from './util/Api';
//example call for App.js - <TokenInput userType="Organizer" />

const TokenInput = props => {
    const [userType, setUserType] = useState('');
    const [error, setError] = useState(false);
    const [token, setToken] = useState('');

    // example match data (needs to be consulted with backend team)
    const [matchData, setMatchData] = useState({
        fighter1Name: 'Fighter1',
        fighter2Name: 'Fighter2',
        time: 0,
        events: [],
    });

    // temporary example request handler - for referee
    // needs an endpoint on the backend which will return match data fitting the token and fail if token is invalid
    // we can make different endpoints for different user types
    // needs a route to match/organizer main screen after getting the data
    const [clickAction, setClickAction] = useState(() => token => {
        setError(false);
        console.log(token);
        console.log('/match/' + token);

        Api.get(
            '/match/' + token // temporary request body
        )
            .then(res => {
                console.log(res);
                console.log('Mock sent token to backend');

                // waiting for backend
                // if(props.userType != "Organizer"){
                //     setMatchData(res);
                // }
                // route to another screen here
            })
            .catch(e => {
                setError(true);
                console.log(e);
                console.log(token);
                console.log('Could not send mock token to back');
            });
    });

    //we can set things like routes on button click, function called on token submit depending on the type later
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
                setUserType('Organizer');
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
                    <Input
                        marginTop="20px"
                        placeholder="Podaj kod spotkania"
                        onChangeText={value => {
                            setToken(value);
                        }}
                    ></Input>
                    <Button
                        marginTop="20px"
                        marginRight="50px"
                        marginLeft="50px"
                        bg="#059669"
                        _text={{
                            color: 'white',
                        }}
                        onPress={() => clickAction(token)}
                    >
                        Dołącz
                    </Button>
                    <Text color="red.500">
                        {error &&
                            'Unable to join the match, please check the token and try again'}
                        {token}
                    </Text>
                </VStack>
            </Center>
        </>
    );
};

export default TokenInput;
