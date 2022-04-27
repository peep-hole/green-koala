import React, { useEffect, useState } from 'react';
import Api from "./util/Api";
import FormHeader from "./util/FormHeader";
import { VStack, Button, Center, Flex, Text, ScrollView } from "native-base";
import { FontAwesome } from "@expo/vector-icons";

const FightInfo = props => {

    let [fightData, setFightData] = useState({});
    let [fighter1, setFirstFighter] = useState({});
    let [fighter2, setSecondFighter] = useState({});

    //request for match instance with fightID
    const getFight = () => {
        Api.get('/matches/id/' + props.fightId
        ).then(res => { setFightData(res.data) }).catch(e => { console.log(e) })
    };

    //request for match's fighters data
    const getFighters = () => {
        Api.get('/actors/fighters/id/' + fightData.fighterId1
        ).then(res => { setFirstFighter(res.data) }).catch(e => { console.log(e) });

        Api.get('/actors/fighters/id/' + fightData.fighterId2
        ).then(res => { setSecondFighter(res.data) }).catch(e => { console.log(e) });
    };

    useEffect(() => {
        console.log("Fight id: ", props.fightId)
        getFight();
        //temporary mocked fight data
        setFightData({
            "id": "123",
            "fighterId1": "123",
            "fighterId2": "222",
            "date": "12.05.2022",
            "time": "18:22",
            "mainRefereeToken": "wergr342rfgq5354r23e1",
            "mainRefereeId": "234",
            "sideRefereeToken1": "32thhrlyjjytq5354r23e1",
            "sideRefereeId1": "324",
            "sideRefereeToken2": "124324tgtrfertertwet43",
            "sideRefereeId2": "444",
        });
        getFighters();
        //temporary mocked fighters
        setFirstFighter({
            "id": "123",
            "name": "Marien",
            "surname": "Quinteiro",
            "age": "34"
            //...
        });
        setSecondFighter({
            "id": "122",
            "name": "Philipe",
            "surname": "Contore",
            "age": "33"
            //...
        });
        console.log(fightData, fighter1, fighter2);
    }, []);

    return (
        <>
            <FormHeader name="Fight Details"></FormHeader>
            <ScrollView>
                <Center>
                    {/* Fight date-time */}
                    <Flex direction="row" >
                        <FontAwesome name="calendar" size={28} color="black" />
                        <Text marginLeft={5} color="black" fontSize={22} fontWeight="bold" >
                            {fightData.date} {fightData.time}
                        </Text>
                    </Flex>

                    {/* Fighter1 vs Fighter2 */}
                    <Flex direction="row" marginTop="15px" rounded="lg" borderColor="black" borderWidth="1" p="4px">
                        <FontAwesome name="user-circle" size={28} color="black" />
                        <Text marginLeft={5} color="black" fontSize={20} fontWeight="bold" >
                            {fighter1.name}  {fighter1.surname}
                        </Text>
                    </Flex>
                    <Text marginTop="5px" marginBottom="5px" color="black" fontSize={22} fontWeight="bold" >VS</Text>
                    <Flex direction="row" rounded="lg" borderColor="black" borderWidth="1" p="4px">
                        <FontAwesome name="user-circle" size={28} color="black" />
                        <Text marginLeft={5} color="black" fontSize={20} fontWeight="bold" >
                            {fighter2.name}  {fighter2.surname}
                        </Text>
                    </Flex>

                    {/* Rules, TODO: api/matches/id/{id} seems to not contain rules info */}
                    <Text marginTop="20px" color="black" fontSize={18} fontWeight="bold" >Rules:</Text>
                    <Text marginLeft="35px" marginRight="40px" color="grey" fontSize={15}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the </Text>

                    {/* Joining codes for referees */}
                    <Text marginTop="15px" color="black" fontSize={16} fontWeight="bold" >Join codes:</Text>
                    <VStack alignItems="center">
                        <Text marginTop="5px" color="black" fontSize={14} fontWeight="bold">Main Referee:</Text>
                        <Text color="black" fontSize={16} >{fightData.mainRefereeToken}</Text>
                        <Text marginTop="5px" color="black" fontSize={14} fontWeight="bold">Side Referee 1:</Text>
                        <Text color="black" fontSize={16} >{fightData.sideRefereeToken1}</Text>
                        <Text marginTop="5px" color="black" fontSize={14} fontWeight="bold">Side Referee 2:</Text>
                        <Text color="black" fontSize={16} >{fightData.sideRefereeToken2}</Text>
                    </VStack>

                    {/* Fight cancelling button TODO: send request to backend */}
                    <Button marginTop="30px" colorScheme="red"
                        onPress={() => console.log("Handling fight cancelling...")}>Cancel fight</Button>
                </Center>
            </ScrollView>

            {/* Here footer component containing administrator's navigation bar */}
        </>
    );
};

export default FightInfo;