import React, {useEffect, useState} from 'react';
import {Button, Center, Input, Text, VStack} from 'native-base';
import FormHeaderLink from './util/FormHeaderLink';
import Api from './util/Api';
import {Navigate, useLocation} from 'react-router-native';
import {BarCodeScanner} from 'expo-barcode-scanner';
//example call for App.js - <TokenInput userType="Organizer" />
import {StyleSheet} from 'react-native';

const TokenInput = () => {
    const props = useLocation();
    const [userType, setUserType] = useState('');
    const [error, setError] = useState(false);
    const [token, setToken] = useState('');

    const [matchData, setMatchData] = useState({});
    const [refereeJoining, setRefereeJoining] = useState(false);
    const [organizerJoining, setOrganizerJoining] = useState(false);
    const [matchDataLoaded, setMatchDataLoaded] = useState(false);
    const [isQRScanning, setIsQRScanning] = useState(false);

    const [, setHasPermission] = useState(null);

    const [fighter1, setFirstFighter] = useState({});
    const [fighter2, setSecondFighter] = useState({});

    const [f1Loaded, setF1Loaded] = useState(false);
    const [f2Loaded, setF2Loaded] = useState(false);

    const handleCodeScanned = ({ type, data }) => {
        console.log(type);
        setToken(data);
        setIsQRScanning(false);
    };

    // temporary example request handler - for referee
    // needs an endpoint on the backend which will return match data fitting the token and fail if token is invalid
    // we can make different endpoints for different user types
    // needs a route to match/organizer main screen after getting the data
    const joinAction = () => {
        setError(false);

        if (props.state.userType == 'Organizer') {
            //here request for organizer to authenticate
            // if response allows you to join as organizer with your token -
            // then navigate to main organizer view

            //for now NO MATTER what TOKEN IS USED ! EVERYTIME redirect!

            setOrganizerJoining(true);
        } else {
            //Main or Side referee is joining - set referee joining and send request with passed token
            //to get match instance which token allows you to join

            Api.get('/matches/token/' + token)
                .then(res => {
                    setMatchData(res.data);
                    setMatchDataLoaded(true);
                    getFightersData(res.data);

                    if (
                        (props.state.userType == 'Main' && res.data.mainRefereeToken == token) ||
                        (props.state.userType == 'Side' &&
                            (res.data.sideRefereeToken1 == token ||
                                res.data.sideRefereeToken2 == token))
                    ) {
                        setRefereeJoining(true);
                    } else {
                        setError(true);
                    }
                })
                .catch(e => {
                    setError(true);
                    console.log(e);
                });
        }
    };

    const getFightersData = data => {
        const fighterId1 = data.fighterId1;
        const fighterId2 = data.fighterId2;

        Api.get('/actors/fighters/id/' + fighterId1).then(res => {
            setFirstFighter(res.data);
            setF1Loaded(true);
        });

        Api.get('/actors/fighters/id/' + fighterId2).then(res => {
            setSecondFighter(res.data);
            setF2Loaded(true);
        });
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
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    });

    return (
        <>
            {!isQRScanning && (
                <>
                    <FormHeaderLink pathname="loginPick" name="Token"></FormHeaderLink>
                    <Center marginTop="20%">
                        <Text fontSize="20">You are entering the app as</Text>
                        <Text fontWeight="bold" fontSize="30">
                            {userType}
                        </Text>
                        <VStack width="90%">
                            <Input
                                marginTop="20px"
                                placeholder="Enter your login token"
                                onChangeText={value => {
                                    setToken(value);
                                }}
                            ></Input>
                            <Button
                                marginTop="20px"
                                marginRight="50px"
                                marginLeft="50px"
                                bg="#059669"
                                _text={{ color: 'white' }}
                                onPress={joinAction}
                            >
                                Enter the app
                            </Button>
                            <Button
                                marginTop="20px"
                                marginRight="50px"
                                marginLeft="50px"
                                bg="#059669"
                                _text={{ color: 'white' }}
                                onPress={() => {
                                    setIsQRScanning(true);
                                }}
                            >
                                Scan a QR code
                            </Button>
                            <Text color="red.500">
                                {error && 'Unable to join, please check the token and try again'}
                            </Text>
                        </VStack>
                    </Center>
                    {organizerJoining && (
                        <Navigate to="/matchList" state={{ token: token }}></Navigate>
                    )}
                    {refereeJoining && matchDataLoaded && f1Loaded && f2Loaded && (
                        <Navigate
                            to="/displayMatch"
                            state={{
                                userType: props.state.userType,
                                matchData: matchData,
                                fighter1: fighter1,
                                fighter2: fighter2,
                                token: token,
                            }}
                        ></Navigate>
                    )}
                </>
            )}

            {isQRScanning && (
                <>
                    <BarCodeScanner
                        onBarCodeScanned={handleCodeScanned}
                        style={StyleSheet.absoluteFillObject}
                    />
                </>
            )}
        </>
    );
};

export default TokenInput;
