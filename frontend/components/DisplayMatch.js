import React, { useState } from 'react';
import { HStack, VStack, Text, Button, Center } from 'native-base';
import FormHeader from './util/FormHeader';

const match = {
    time: 0,
    fighter1Name: 'Fighter One',
    fighter2Name: 'Fighter Two',
    fighter1Score: 3,
    fighter2Score: 2,
};

const DisplayMatch = props => {
    const [matchTime, setMatchTime] = useState(props.match.time);
    const [fighter1Name, setFighter1Name] = useState(props.match.fighter1Name);
    const [fighter2Name, setFighter2Name] = useState(props.match.fighter2Name);
    const [fighter1Score, setFighter1Score] = useState(props.match.fighter1Score);
    const [fighter2Score, setFighter2Score] = useState(props.match.fighter2Score);

    return (
        <>
            <FormHeader name="Match" marginBottom="200px"></FormHeader>
            <Center>
                <VStack width="90%">
                    <Center>
                        <Text>{matchTime}</Text>

                        <HStack>
                            <Text>{fighter1Name}</Text>
                            <Text>{fighter2Name}</Text>
                        </HStack>

                        <HStack>
                            <Text>{fighter1Score}</Text>
                            <Text>{fighter2Score}</Text>
                        </HStack>

                        <VStack>
                            <Text>event1 placeholder</Text>
                            <Text>event2 placeholder</Text>
                        </VStack>

                        <VStack>
                            <HStack>
                                <Button>RED point</Button>
                                <Button>BLUE point</Button>
                            </HStack>
                            <Button>No point</Button>
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
