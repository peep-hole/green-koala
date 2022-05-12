import React, { useEffect, useState } from 'react';
import { HStack, VStack, Text, Button, Center, Box, Flex } from 'native-base';
import FormHeader from './util/FormHeader';
import DisplayScore from './DisplayScore';
import Timer from "./Timer";
import {over} from "stompjs"
import SockJS from 'sockjs-client';
import url from './util/Websocket';

//mockup to use in testing - we will pass a correct object with props from token input
const match = {
    time: 0,
    fighter1Name: 'Fighter One',
    fighter2Name: 'Fighter Two',
    fighter1Score: 3,
    fighter2Score: 2,
};

let sock = null;
let stompClient = null;
/// must be globals!

//easiest way to test - replace App in App.js with:
// export default function App() {
//     const match = {
//         time: 0,
//         fighter1Name: 'Fighter One',
//         fighter2Name: 'Fighter Two',
//         fighter1Score: 3,
//         fighter2Score: 2,
//     };

//     return (

//         <NativeBaseProvider>
//             <SSRProvider>
//                 <DisplayMatch match={match}></DisplayMatch>
//             </SSRProvider>
//         </NativeBaseProvider>
//     );
// }

const DisplayMatch = props => {
    const [matchTime, setMatchTime] = useState(match.time);
    const [fighter1Name, setFighter1Name] = useState(match.fighter1Name);
    const [fighter2Name, setFighter2Name] = useState(match.fighter2Name);
    const [fighter1Score, setFighter1Score] = useState(match.fighter1Score);
    const [fighter2Score, setFighter2Score] = useState(match.fighter2Score);
    const [sideDecisions, setSideDecisions] = useState({
        side1: "Ref 1 decision", /// remove before pr
        side2: "Placeholder 2",
        points1: null,
        points2: null
    })

    //will be used to determine which elements of the interface should be shown - either "Main" or "Side"
    // const refereeType = props.refereeType;

    useEffect(() => {
        sock = new SockJS(url);
        stompClient = over(sock);
        stompClient.connect({}, onConnected, onError);
    }, []);

    const onConnected = () => {
        stompClient.subscribe("/response/status", () => {
            Api.get(`/status/${props.id}`
            ).then(res => {
                console.log(res.data) /// TODO: make sure that everything works when back implementation will be ready
                setSideDecisions({
                    side1: res.data.side1ActualDecision,
                    side2: res.data.side2ActualDecision,
                    points1: res.data.points1,
                    points2: res.data.points2
                })
            }).catch(e => {
                console.log(e)
            })
        })
    }

    const onError = (error) => {
        console.log("Error: " + error);
    }

    return (
        <>
            <FormHeader name="Match" marginBottom="200px"/>
            <Center>
                <VStack width="90%">
                    <Timer/>
                    <Center>
                        <HStack width="100%" mb="20px">
                            <Box
                                bg="red.400"
                                p="5px"
                                width="50%"
                                borderColor="black"
                                borderWidth="1"
                                height="40px"
                            >
                                <Center>
                                    <Text color="white">{fighter1Name.toString()}</Text>
                                </Center>
                            </Box>
                            <Box
                                bg="blue.400"
                                p="5px"
                                width="50%"
                                borderColor="black"
                                borderWidth="1"
                                height="40px"
                            >
                                <Center>
                                    <Text color="white">{fighter2Name.toString()}</Text>
                                </Center>
                            </Box>
                        </HStack>

                        <DisplayScore
    fighter1Score={fighter1Score}
    fighter2Score={fighter2Score}
    />

                        <Box bg="gray.300" mb="20px" width="100%" height="200px">
                            <VStack>
                                <Center>
                                    <Text>{sideDecisions.side1}</Text>
                                </Center>
                                <Center>
                                    <Text>{sideDecisions.side2}</Text>
                                </Center>
                            </VStack>
                        </Box>

                        <VStack>
                            <Center>
                                <HStack>
                                    <Button width="50%" p="20px" m="2px" bg="red.500">
                                        RED point
                                    </Button>
                                    <Button width="50%" p="20px" m="2px" bg="blue.500" n>
                                        BLUE point
                                    </Button>
                                </HStack>
                            </Center>

                            <Center>
                                <Button bg="gray.500" p="15px" width="100%">
                                    No point
                                </Button>
                            </Center>
                        </VStack>
                    </Center>
                </VStack>
            </Center>

            <Text marginTop="auto" textAlign={'center'}>
                Navbar placeholder
            </Text>
        </>
    );
};

export default DisplayMatch;
