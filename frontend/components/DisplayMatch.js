import React, { useState } from 'react';
import { HStack, VStack, Text, Button, Center, Box, Flex } from 'native-base';
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

    //will be used to determine which elements of the interface should be shown - either "Main" or "Side"
    const refereeType = props.refereeType;

    return (
        <>
            <FormHeader name="Match" marginBottom="200px"></FormHeader>
            <Center>
                <VStack width="90%">
                    <Center>
                        <Text>{matchTime}</Text>

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
                                    <Text color="white">{fighter1Name}</Text>
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
                                    <Text color="white">{fighter2Name}</Text>
                                </Center>
                            </Box>
                        </HStack>

                        <Flex
                            bg="gray.300"
                            p="5%"
                            width="auto"
                            borderColor="black"
                            borderWidth="1"
                            rounded="lg"
                            flexDirection="row"
                            alignItems={'center'}
                            mb="20px"
                        >
                            <Center
                                bg="gray.300"
                                _text={{
                                    color: 'black',
                                    fontWeight: 'bold',
                                    fontSize: '4xl',
                                }}
                                width="120px"
                                height="64px"
                                borderColor="black"
                                borderWidth="1"
                            >
                                {fighter1Score}
                            </Center>

                            <Center>
                                <Text fontSize="md" p="20px">
                                    Score
                                </Text>
                            </Center>

                            <Center
                                bg="gray.300"
                                _text={{
                                    color: 'black',
                                    fontWeight: 'bold',
                                    fontSize: '4xl',
                                }}
                                width="120px"
                                height="64px"
                                borderColor="black"
                                borderWidth="1"
                            >
                                {fighter2Score}
                            </Center>
                        </Flex>

                        <Box bg="gray.300" mb="20px" width="100%" height="200px">
                            <VStack>
                                <Center>
                                    <Text>event1 placeholder</Text>
                                </Center>
                                <Center>
                                    <Text>event2 placeholder</Text>
                                </Center>
                            </VStack>
                        </Box>

                        <VStack>
                            <HStack>
                                <Button width="50%" p="20px" bg="red.500">
                                    RED point
                                </Button>
                                <Button width="50%" p="20px" bg="blue.500" n>
                                    BLUE point
                                </Button>
                            </HStack>
                            <Button bg="gray.500" p="30px">
                                No point
                            </Button>
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
