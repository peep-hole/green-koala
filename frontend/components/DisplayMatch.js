import React, { useEffect, useState } from 'react';
import { HStack, VStack, Text, Button, Center, Box, View } from 'native-base';
import FormHeader from './util/FormHeader';
import DisplayScore from './DisplayScore';
import Timer from "./Timer";
import MainRefereeFooter from './util/MainRefereeFooter';
import { useLocation } from 'react-router-native';

//mockup to use in testing - we will pass a correct object with props from token input
const match = {
    time: 0,
    fighter1Name: 'Fighter One',
    fighter2Name: 'Fighter Two',
    fighter1Score: 3,
    fighter2Score: 2,
};

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

const DisplayMatch = () => {

    const props = useLocation();

    const [matchTime, setMatchTime] = useState(match.time);
    const [fighter1Name, setFighter1Name] = useState(match.fighter1Name);
    const [fighter2Name, setFighter2Name] = useState(match.fighter2Name);
    const [fighter1Score, setFighter1Score] = useState(match.fighter1Score);
    const [fighter2Score, setFighter2Score] = useState(match.fighter2Score);

    const [refereeType, setRefereeType] = useState(props.state.userType);
    //will be used to determine which elements of the interface should be shown - either "Main" or "Side"

    useEffect(() => {
        setRefereeType(props.state.userType);
        console.log("Joined match as:")
        console.log(props.state.userType)
    }, []);


    return (
        <View height="100%">
            <FormHeader name="Match"/>
            <Center height="70%">
                <VStack width="90%" >
                    <Timer />
                    <Center>
                        <HStack width="100%" mb="20px">
                            <Box
                                bg="red.500"
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
                                bg="blue.500"
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

                        <Box bg="gray.300" mb="20px" width="100%" height="30%">
                            <VStack>
                                <Center>
                                    <Text>event1 placeholder</Text>
                                </Center>
                                <Center>
                                    <Text>event2 placeholder</Text>
                                </Center>
                            </VStack>
                        </Box>

                        <VStack width="100%">
                            <Center>
                                <HStack width="100%">
                                    <Button width="50%" p="20px" mb="2px" bg="red.500">
                                        RED point
                                    </Button>
                                    <Button width="50%" p="20px" mb="2px" bg="blue.500" n>
                                        BLUE point
                                    </Button>
                                </HStack>
                            </Center>

                            <Center>
                                <Button bg="gray.500"  width="100%">
                                    No point
                                </Button>
                            </Center>
                        </VStack>
                    </Center>
                </VStack>
            </Center>

            <MainRefereeFooter selected={1}
                state={{
                    fighter1: fighter1Name.toString(),
                    fighter2: fighter2Name.toString(),
                    fighter1Score: fighter1Score,
                    fighter2Score: fighter2Score,
                    userType: refereeType
                }}>

            </MainRefereeFooter>
        </View>

    );
};

export default DisplayMatch;
