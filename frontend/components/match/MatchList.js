import React, { useEffect, useState } from 'react';
import Api from '../util/Api';
import FormHeaderLink from '../util/FormHeaderLink';
import { VStack, Flex, Center, Box, Heading, FlatList, HStack, Spacer, Text } from 'native-base';
import { Link } from "react-router-native";
import { Ionicons } from '@expo/vector-icons';
import AdminFooter from '../util/AdminFooter';

const MatchList = () => {

    const [matches, setMatches] = useState([]);
    const [matchesLoaded, setMatchesLoaded] = useState(false);

    const getAllMatches = () => {
        Api.get('/matches/all' //TODO: special endpoint for getting matches + fighters
        ).then(res => {
            setMatches(res.data);
            setMatchesLoaded(true);
        }).catch(e => {
            console.log(e);
        })
    }

    useEffect(() => {
        getAllMatches();
    }, [])


    return (
        <>
            <FormHeaderLink pathname="" state={{}} name="Matches" />
            {matchesLoaded && <>
                <Box id="oncoming_matches" height="33%" >
                    <Center>
                        <Heading fontSize="xl" marginBottom={1}>
                            Oncoming Fights
                        </Heading>
                    </Center>
                    {/* TODO: update filtering when model will contain bool determining if fight is over / or maybe score is not null? */}
                    <FlatList margin={3} backgroundColor="gray.200"
                        data={matches.filter(match => !match.isFinished)} renderItem={
                            ({ item }) =>
                                <Link to="/fightInfo" state={{ fightId: item.id }} >
                                    <Box borderBottomWidth={1} borderTopWidth={1} _dark={{ borderColor: "gray.800" }} borderColor="coolGray.400" pl="4" pr="5" py="2">
                                        <HStack space={3} justifyContent="space-between">
                                            <VStack>
                                                <Text _dark={{ color: "warmGray.50" }} color="coolGray.800" bold>
                                                    Fighter1 vs Fighter2
                                                </Text>
                                            </VStack>
                                            <Spacer />
                                            <Text fontSize="xs" _dark={{ color: "warmGray.50" }} color="#065f46" alignSelf="flex-start">
                                                {item.date}
                                            </Text>
                                        </HStack>
                                    </Box>
                                </Link>
                        } keyExtractor={item => item.id} />
                </Box>
                <Box id="history_matches" height="33%">
                    <Center>
                        <Heading fontSize="xl" marginTop={1} marginBottom={1}>
                            History Fights
                        </Heading>
                    </Center>
                    <FlatList margin={3} backgroundColor="gray.200"
                        data={matches.filter(match => !match.isFinished)} renderItem={
                            ({ item }) =>
                                <Link to="/fightResult" state={{ fightId: item.id }} >
                                    <Box borderBottomWidth={1} borderTopWidth={1} _dark={{ borderColor: "gray.800" }} borderColor="coolGray.400" pl="4" pr="5" py="2">
                                        <HStack space={3} justifyContent="space-between">
                                            <VStack>
                                                <Text _dark={{ color: "warmGray.50" }} color="coolGray.800" bold>
                                                    Fighter1 vs Fighter2
                                                </Text>
                                            </VStack>
                                            <Spacer />
                                            <Text fontSize="xs" _dark={{ color: "warmGray.50" }} color="#065f46" alignSelf="flex-start">
                                                {item.date}
                                            </Text>
                                        </HStack>
                                    </Box>
                                </Link>}
                        keyExtractor={item => item.id} />
                </Box>
                <Flex direction="row-reverse" marginRight="5px">
                    <Link to="/createMatchForm">
                        <Ionicons name="md-add-circle-sharp" size={70} color="#065f46" />
                    </Link>
                </Flex>
            </>}
            <AdminFooter selected={1}></AdminFooter>
        </>
    );
};

export default MatchList;
