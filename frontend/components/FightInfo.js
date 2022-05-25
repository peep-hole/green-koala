import React, { useEffect, useState } from 'react';
import Api from './util/Api';
import FormHeaderLink from './util/FormHeaderLink';
import { VStack, Button, Center, Flex, Text, ScrollView } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { Navigate } from 'react-router-native';
import { useLocation } from 'react-router-native';
import QRCode from 'react-qr-code';
import { Box } from 'native-base';

const FightInfo = () => {
    const props = useLocation();
    const [fightData, setFightData] = useState({});
    const [fighter1, setFirstFighter] = useState({});
    const [fighter2, setSecondFighter] = useState({});
    const [loading, setLoading] = useState(true);
    const [f1loading, setF1Loading] = useState(true);
    const [f2loading, setF2Loading] = useState(true);

    const [fightCancelling, setFightCancelling] = useState(false);

    useEffect(() => {
        Api.get('/matches/id/' + props.state.fightId).then(res => {
            setFightData(res.data);
            // console.log(res.data);
            const fighterId1 = res.data.fighterId1;
            const fighterId2 = res.data.fighterId2;
            setLoading(false);

            Api.get('/actors/fighters/id/' + fighterId1).then(res => {
                console.log(res.data);
                setFirstFighter(res.data);
                setF1Loading(false);
            });

            Api.get('/actors/fighters/id/' + fighterId2).then(res => {
                console.log(res.data);
                setSecondFighter(res.data);
                setF2Loading(false);
            });
        });
    }, []);

    const cancelFight = () => {
        setFightCancelling(true);
    };

    return (
        <>
            <FormHeaderLink pathname="matchList" state={{}} name="Fight Details" />
            <ScrollView>
                <Center>
                    {/* Fight date-time */}
                    <Flex direction="row">
                        <FontAwesome name="calendar" size={28} color="black" />
                        <Text marginLeft={5} color="black" fontSize={22} fontWeight="bold">
                            {!loading && fightData.date + ' ' + fightData.time}
                        </Text>
                    </Flex>

                    {/* Fighter1 vs Fighter2 */}
                    <Flex
                        direction="row"
                        marginTop="15px"
                        rounded="lg"
                        borderColor="black"
                        borderWidth="1"
                        p="4px"
                    >
                        <FontAwesome name="user-circle" size={28} color="black" />
                        <Text marginLeft={5} color="black" fontSize={20} fontWeight="bold">
                            {!f1loading && fighter1.name + ' ' + fighter1.surname}
                        </Text>
                    </Flex>
                    <Text
                        marginTop="5px"
                        marginBottom="5px"
                        color="black"
                        fontSize={22}
                        fontWeight="bold"
                    >
                        VS
                    </Text>
                    <Flex direction="row" rounded="lg" borderColor="black" borderWidth="1" p="4px">
                        <FontAwesome name="user-circle" size={28} color="black" />
                        <Text marginLeft={5} color="black" fontSize={20} fontWeight="bold">
                            {!f2loading && fighter2.name + ' ' + fighter2.surname}
                        </Text>
                    </Flex>

                    {/* Rules, TODO: api/matches/id/{id} seems to not contain rules info */}
                    <Text marginTop="20px" color="black" fontSize={18} fontWeight="bold">
                        Rules:
                    </Text>
                    <Text marginLeft="35px" marginRight="40px" color="grey" fontSize={15}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        Lorem Ipsum has been the industry`&apos;`s standard dummy text ever since
                        the{' '}
                    </Text>

                    {/* Joining codes for referees */}
                    <Text marginTop="15px" color="black" fontSize={16} fontWeight="bold">
                        Join codes:
                    </Text>
                    <VStack alignItems="center">
                        <Text marginTop="5px" color="black" fontSize={14} fontWeight="bold">
                            Main Referee:
                        </Text>
                        <Text color="black" fontSize={16}>
                            {fightData.mainRefereeToken}
                        </Text>
                        <Box mb={4}>
                            {!loading && <QRCode size={80} value={fightData.mainRefereeToken} />}
                        </Box>
                        <Text marginTop="5px" color="black" fontSize={14} fontWeight="bold">
                            Side Referee 1:
                        </Text>
                        <Text color="black" fontSize={16}>
                            {fightData.sideRefereeToken1}
                        </Text>
                        <Box mb={4}>
                            {!loading && <QRCode size={80} value={fightData.sideRefereeToken1} />}
                        </Box>
                        <Text marginTop="5px" color="black" fontSize={14} fontWeight="bold">
                            Side Referee 2:
                        </Text>
                        <Text color="black" fontSize={16}>
                            {fightData.sideRefereeToken2}
                        </Text>
                        <Box mb={4}>
                            {!loading && <QRCode size={80} value={fightData.sideRefereeToken2} />}
                        </Box>
                    </VStack>

                    {/* Fight cancelling button*/}
                    <Button marginTop="30px" colorScheme="red" onPress={cancelFight}>
                        <Text>Cancel fight</Text>
                    </Button>
                </Center>
            </ScrollView>

            {fightCancelling && (
                <Navigate
                    to="/cancelMatch"
                    state={{
                        fightId: props.state.fightId,
                        date: fightData.date + ' ' + fightData.time,
                        fighter1: fighter1.name + ' ' + fighter1.surname,
                        fighter2: fighter2.name + ' ' + fighter2.surname,
                    }}
                ></Navigate>
            )}
        </>
    );
};

export default FightInfo;
