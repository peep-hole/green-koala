import React, { useEffect, useState } from 'react';
import { Input, NativeBaseProvider, Text, Center, Button, VStack } from 'native-base';
import FormHeaderLink from './util/FormHeaderLink';
import { FontAwesome } from '@expo/vector-icons';
import Api from './util/Api';
import { Navigate, useLocation } from 'react-router-native';

//example call for App.js - <TokenInput userType="Organizer" />

const TokenInput = () => {

    const props = useLocation();
    const [userType, setUserType] = useState('');
    const [error, setError] = useState(false);
    const [token, setToken] = useState('');

    const [matchData, setMatchData] = useState({});
    const [refereeJoining, setRefereeJoining] = useState(false);
    const [organizerJoining, setOrganizerJoining] = useState(false);


    // temporary example request handler - for referee
    // needs an endpoint on the backend which will return match data fitting the token and fail if token is invalid
    // we can make different endpoints for different user types
    // needs a route to match/organizer main screen after getting the data
    const joinAction = () => {
        setError(false);

        if (props.state.userType == "Organizer") {
            //here request for organizer to authenticate
            // if response allows you to join as organizer with your token -
            // then navigate to main organizer view

            //for now NO MATTER what TOKEN IS USED ! EVERYTIME redirect!

            setOrganizerJoining(true);
        }
        else {
            //Main or Side referee is joining - set referee joining and send request with passed token 
            //to get match instance which token allows you to join

            Api.get('/matches/token/' + token)
                .then(res => {
                    console.log(res.data);
                    console.log('Tokent sent');
                    setMatchData(res.data);
                    if ((props.state.userType == "Main" && res.data.mainRefereeToken == token) ||
                        (props.state.userType == "Side" && (res.data.sideRefereeToken1 == token || res.data.sideRefereeToken2 == token))) {
                        setRefereeJoining(true);
                    }
                    else {
                        console.log("You are not authorized to join as " + props.state.userType + "Referee with this token!");
                        setError(true);
                    }
                })
                .catch(e => {
                    setError(true);
                    console.log(e);
                    console.log('Could not send mock token to back');
                });
        }
    };

    //do we need this? maybe we can just keep using props.state.userType
    useEffect(() => {
        switch (props.state.userType) {
            case 'Main':
                setUserType('Main Referee');
                break;
            case 'Side':
                setUserType('Side Referee');
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
            <FormHeaderLink pathname="loginPick" name="Token"></FormHeaderLink>
            <Center marginTop="20%">
                <Text fontSize="20">You are entering the app as</Text>
                <Text fontWeight="bold" fontSize="30">
                    {userType}
                </Text>
                <VStack width="90%">
                    <Input marginTop="20px" placeholder="Enter your login token" onChangeText={value => { setToken(value); }}></Input>
                    <Button marginTop="20px" marginRight="50px" marginLeft="50px" bg="#059669" _text={{ color: 'white', }}
                        onPress={joinAction}>
                        Enter the app
                    </Button>
                    <Text color="red.500">
                        {error && 'Unable to join, please check the token and try again'}
                    </Text>
                </VStack>
            </Center>
            {organizerJoining && <Navigate to="/matchList" state={{ token: token }}></Navigate>}
            {refereeJoining && <Navigate to="/displayMatch" state={{ userType: props.state.userType }}></Navigate>}

        </>
    );
};

export default TokenInput;
