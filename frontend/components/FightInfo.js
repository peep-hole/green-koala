import React, { useEffect, useState } from 'react';
import FormHeader from "./util/FormHeader";
import { Button, Center, Flex, Text, } from "native-base";
import Api from "./util/Api";
import { FontAwesome } from "@expo/vector-icons";

const FightInfo = fightID => {

    let [fightData, setFightData] = useState({})
    let [fighter1, setFirstFighter] = useState({})
    let [fighter2, setSecondFighter] = useState({})

    //request for match instance with fightID
    const getFight = () => {
        Api.get('/matches/id/' + fightID // TODO type proper url 
        ).then(res => { setFightData(res.data) }).catch(e => { console.log(e) })
    }

    const getFighters = () => {
        Api.get('/fighters/id' + fightData.fighterId1 // TODO type proper url 
        ).then(res => { setFirstFighter(res.data) }).catch(e => { console.log(e) })

        Api.get('/fighters/id' + fightData.fighterId2 // TODO type proper url 
        ).then(res => { setSecondFighter(res.data) }).catch(e => { console.log(e) })
    }

    useEffect(() => {
        getFight()
        fightData = {
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
        }
        getFighters()
        fighter1 = {
            "id": "123",
            "firstName": "Marien",
            "lastName": "Quinteiro",
            "age": "34"
            //etc
        }
        fighter2 = {
            "id": "122",
            "firstName": "Philipe",
            "lastName": "Contore",
            "age": "33"
            //etc
        }
        console.log(fighter1, fighter2, fightData)
        console.log(fighter1.firstName)
    }, [])

    return (
        <>
            <FormHeader name="Fight Details"></FormHeader>
            <Center>
                <Flex direction="row">
                    <FontAwesome name="calendar" size={30} color="black" />
                    <Text marginLeft={5} color="black" fontSize={22} fontWeight="bold" >
                        {fightData.date} {fightData.time}
                    </Text>
                </Flex>
                <Flex direction="row" marginTop="20px">
                    <FontAwesome name="user-circle" size={30} color="black" />
                    <Text marginLeft={5} color="black" fontSize={22} fontWeight="bold" >
                        {fighter1.firstName}  {fighter1.lastName}
                    </Text>
                </Flex>
                <Text marginTop="10px" marginBottom="10px" color="black" fontSize={22} fontWeight="bold" >
                    VS
                </Text>
                <Flex direction="row">
                    <FontAwesome name="user-circle" size={30} color="black" />
                    <Text marginLeft={5} color="black" fontSize={22} fontWeight="bold" >
                        {fighter2.firstName}  {fighter2.lastName}
                    </Text>
                </Flex>

            </Center>
        </>
    );
};

export default FightInfo;