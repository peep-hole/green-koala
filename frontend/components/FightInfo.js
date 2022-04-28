import React, { useEffect, useState } from 'react';
import Api from './util/Api';
import FormHeader from './util/FormHeader';
import { VStack, Button, Center, Flex, Text, ScrollView } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

const FightInfo = props => {
    const [fightData, setFightData] = useState({});
    const [fighter1, setFirstFighter] = useState({});
    const [fighter2, setSecondFighter] = useState({});
    const [loading, setLoading] = useState(true);
    const [f1loading, setF1Loading] = useState(true);
    const [f2loading, setF2Loading] = useState(true);

    // //request for match instance with fightID
    // const getFight = () => {
    //     Api.get('/matches/id/' + 'ea5d74b4-c70b-11ec-9d64-0242ac120002')
    //         .then(res => {
    //             console.log(res.data);
    //             setFightData(res.data);
    //             console.log(fightData);
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // };

    // //request for match's fighters data
    // const getFighters = () => {
    //     console.log(fightData);
    //     Api.get('/actors/fighters/id/' + fightData.fighterId1)
    //         .then(res => {
    //             setFirstFighter(res.data);
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });

    //     Api.get('/actors/fighters/id/' + fightData.fighterId2)
    //         .then(res => {
    //             setSecondFighter(res.data);
    //         })
    //         .catch(e => {
    //             console.log(e);
    //         });
    // };

    useEffect(() => {
        axios.get('http://localhost:8080/api' + '/matches/id/' + props.fightId).then(data => {
            setFightData(data.data);
            console.log(data);
            //console.log(fightData.data);
            const fighterId1 = data.data.fighterId1;
            const fighterId2 = data.data.fighterId2;
            setLoading(false);

            axios
                .get('http://localhost:8080/api' + '/actors/fighters/id/' + fighterId1)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    setFirstFighter(res.data);
                    setF1Loading(false);
                });

            axios
                .get('http://localhost:8080/api' + '/actors/fighters/id/' + fighterId2)
                .then(res => {
                    setSecondFighter(res.data);
                    setF2Loading(false);
                });
        });
    }, []);

    return (
        <>
            <FormHeader name="Fight Details" />
            <ScrollView>
                <Center>
                    {/* Fight date-time */}
                    <Flex direction="row">
                        <FontAwesome name="calendar" size={28} color="black" />
                        <Text marginLeft={5} color="black" fontSize={22} fontWeight="bold">
                            {!loading && fightData.date && ' ' && fightData.time}
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
                    <Flex
                        direction="row"
                        rounded="lg"
                        borderColor="black"
                        borderWidth="1"
                        p="4px"
                    >
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
                        Lorem Ipsum is simply dummy text of the printing and typesetting
                        industry. Lorem Ipsum has been the industry's standard dummy text ever
                        since the{' '}
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
                        <Text marginTop="5px" color="black" fontSize={14} fontWeight="bold">
                            Side Referee 1:
                        </Text>
                        <Text color="black" fontSize={16}>
                            {fightData.sideRefereeToken1}
                        </Text>
                        <Text marginTop="5px" color="black" fontSize={14} fontWeight="bold">
                            Side Referee 2:
                        </Text>
                        <Text color="black" fontSize={16}>
                            {fightData.sideRefereeToken2}
                        </Text>
                    </VStack>

                    {/* Fight cancelling button TODO: send request to backend */}
                    <Button
                        marginTop="30px"
                        colorScheme="red"
                        onPress={() => console.log('Handling fight cancelling...')}
                    >
                        Cancel fight
                    </Button>
                </Center>
            </ScrollView>

            {/* Here footer component containing administrator's navigation bar */}
        </>
    );
};

export default FightInfo;
