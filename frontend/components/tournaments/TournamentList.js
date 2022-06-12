import React, { useEffect, useState } from 'react';
import Api from '../util/Api';
import FormHeader from '../util/FormHeader';
import { VStack, Flex, Center, Box, Heading, FlatList, HStack, Spacer, Text } from 'native-base';
import { Link } from "react-router-native";
import AdminFooter from '../util/AdminFooter';
import { FontAwesome } from '@expo/vector-icons';


const TournamentList = () => {

    const [tournaments, setTournaments] = useState([]);
    const [tournamentsLoaded, setTournamentsLoaded] = useState(false);

    const getTournamnets = () => {
        Api.get('/tournaments/' //TODO: special endpoint for getting tournaments
        ).then(res => {
            setTournaments(res.data);
            // console.log(res.data);
            // setTournamentsLoaded(true);
        }).catch(e => {
            console.log(e);
        })
    }

    useEffect(() => {
        getTournamnets();
        setTournaments([
            {
                id: "fwefwf32",
                title: "Tournament V",
                date: "17.05.2022",
                isFinished: true,
            },
            {
                id: "fwefw222231112",
                title: "Tournament X",
                date: "17.12.2022",
                isFinished: false,
            },
            {
                id: "fwefw222234232",
                title: "Tournament Z",
                date: "10.06.2022",
                isFinished: true,
            },
            {
                id: "fwefw22232232",
                title: "Tournament Y",
                date: "20.01.2022",
                isFinished: false,
            }


        ]);
        setTournamentsLoaded(true);
        // console.log(tournaments);
    }, [])


    return (
        <>
            <FormHeader state={{}} name="Tournaments" />
            {tournamentsLoaded && <>
                <Box id="oncoming_tournaments" height="33%" >
                    <Center>
                        <Heading fontSize="xl" marginBottom={1}>
                            Oncoming Tournamnets
                        </Heading>
                    </Center>
                    {/* TODO: update filtering when model will contain bool determining if fight is over / or maybe score is not null? */}
                    <FlatList margin={3} backgroundColor="gray.200"
                        data={tournaments.filter(tournament => !tournament.isFinished)} renderItem={
                            ({ item }) =>
                                <Link to="/tournamentInfo" state={{ tournament: item }} >
                                    <Box borderBottomWidth={1} borderTopWidth={1} _dark={{ borderColor: "gray.800" }} borderColor="coolGray.400" pl="4" pr="5" py="2">
                                        <HStack space={3} justifyContent="space-between">
                                            <VStack>
                                                <Text _dark={{ color: "warmGray.50" }} color="coolGray.800" bold>
                                                    {item.title}
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
                <Box id="history_tournaments" height="33%">
                    <Center>
                        <Heading fontSize="xl" marginTop={1} marginBottom={1}>
                            History Tournaments
                        </Heading>
                    </Center>
                    <FlatList margin={3} backgroundColor="gray.200"
                        data={tournaments.filter(tournament => tournament.isFinished)} renderItem={
                            ({ item }) =>
                                <Link to="/tournamentResult" state={{ tournament: item }} >
                                    <Box borderBottomWidth={1} borderTopWidth={1} _dark={{ borderColor: "gray.800" }} borderColor="coolGray.400" pl="4" pr="5" py="2">
                                        <HStack space={3} justifyContent="space-between">
                                            <VStack>
                                                <Text _dark={{ color: "warmGray.50" }} color="coolGray.800" bold>
                                                    {item.title}
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
                <Flex direction="row-reverse" marginRight="14px" marginTop="10px">
                     <Link to="/createTournamentForm">
                        <Box width="57px" height="57px" borderRadius="100" borderWidth="3px" borderColor="#065f46" backgroundColor="#065f46" p="9px" alignItems="center">
                            <FontAwesome name="calendar-plus-o" size={30} color="white" />
                        </Box>
                     </Link>
                </Flex>
            </>}
            <AdminFooter selected={2}></AdminFooter>
        </>
    );
};

export default TournamentList;
