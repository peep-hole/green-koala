import React, { useEffect, useState } from 'react';
import Api from './util/Api';
import FormHeaderLink from './util/FormHeaderLink';
import { VStack, Button, Center, Box, Heading, FlatList, HStack, Spacer, Text, ScrollView } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { Link, useLocation } from "react-router-native";

const MatchList = () => {

    const linkData = useLocation();
    const [matches, setMatches] = useState([]);
    const [matchesLoaded, setMatchesLoaded] = useState(false);

    const getAllMatches = () => {
        Api.get('/matches/all' // TODO check if proper endpont?
        ).then(res => {
            setMatches(res.data);
            // console.log(res.data);
            setMatchesLoaded(true);
        }).catch(e => {
            console.log(e);
        })
    }

    useEffect(() => {
        getAllMatches();
        // console.log(matches);
    }, [])


    return (
        matchesLoaded && <>
            <FormHeaderLink pathname="" state={{}} name="Matches" />
            <Box id="oncoming_matches" height="30%">
                <Heading fontSize="xl" p="4" pb="3">
                    <Center>
                        Oncoming Fights
                    </Center>
                </Heading>
                <ScrollView>
                    <FlatList data={matches.filter(match => !match.isFinished)} renderItem={
                        ({ item }) =>
                            <Link to="/fightInfo" state={{ fightId: item.id }} >
                                <Box borderBottomWidth="1" _dark={{ borderColor: "gray.600" }} borderColor="coolGray.200" pl="4" pr="5" py="2">
                                    <HStack space={3} justifyContent="space-between">
                                        <VStack>
                                            <Text _dark={{ color: "warmGray.50" }} color="coolGray.800" bold>
                                                Fighter1 vs Fighter2
                                            </Text>
                                        </VStack>
                                        <Spacer />
                                        <Text fontSize="xs" _dark={{ color: "warmGray.50" }} color="coolGray.800" alignSelf="flex-start">
                                            {item.date}
                                        </Text>
                                    </HStack>
                                </Box>
                            </Link>
                    } keyExtractor={item => item.id} />
                </ScrollView>
            </Box>
            <Box id="history_matches" height="50%">
                <Heading fontSize="xl" p="4" pb="3">
                    <Center>
                        History Fights
                    </Center>
                </Heading>
                <ScrollView>
                    <FlatList data={matches.filter(match => !match.isFinished)} renderItem={
                        ({ item }) =>
                            <Link to="/fightInfo" state={{ fightId: item.id }} >
                                <Box borderBottomWidth="1" _dark={{ borderColor: "gray.600" }} borderColor="coolGray.200" pl="4" pr="5" py="2">
                                    <HStack space={3} justifyContent="space-between">
                                        <VStack>
                                            <Text _dark={{ color: "warmGray.50" }} color="coolGray.800" bold>
                                                Fighter1 vs Fighter2
                                            </Text>
                                        </VStack>
                                        <Spacer />
                                        <Text fontSize="xs" _dark={{ color: "warmGray.50" }} color="coolGray.800" alignSelf="flex-start">
                                            {item.date}
                                        </Text>
                                    </HStack>
                                </Box>
                            </Link>}
                        keyExtractor={item => item.id} />
                </ScrollView>
            </Box>

            {/* Here footer component containing administrator's navigation bar */}
        </>
    );
};

export default MatchList;
