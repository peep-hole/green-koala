import React, { useEffect, useState } from 'react';
import FormHeader from "./util/FormHeader";
import { Button, Center, Flex, Text, } from "native-base";
import Api from "./util/Api";
import { FontAwesome } from "@expo/vector-icons";

const FightInfo = () => {

    const [date, setDate] = useState(new Date())

    const [fightData, setFightData] = useState({})

    const getFight = (fightID) => {
        Api.get('/fights/' + fightID // TODO type proper url 
        ).then(res => {
            setFightData(res.data)
        }).catch(e => {
            console.log(e) // TODO handle it somehow
        })
    }


    // const [dateString, getDateString] = useState(date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear())
    const [dateString, getDateString] = useState(new Date().toLocaleString())


    useEffect(() => {
        console.log("test")
        getFight()
        setDate(new Date())
        fightData.date = date.toLocaleString()
        fightData.firstPlayer = "Margy Quintero"
        fightData.secondPlayer = "Colby Pierce"

    }, [])

    return (
        <>
            <FormHeader name="Fight Details"></FormHeader>
            <Center>
                <Flex direction="row">
                    <FontAwesome name="calendar" size={30} color="black" />
                    <Text marginLeft={5} color="black" fontSize={22} fontWeight="bold" >
                        {fightData.date}
                    </Text>
                </Flex>
                <Flex direction="row" marginTop="20px">
                    <FontAwesome name="user-circle" size={30} color="black" />
                    <Text marginLeft={5} color="black" fontSize={22} fontWeight="bold" >
                        {fightData.firstPlayer}
                    </Text>
                </Flex>
                <Text marginTop="10px" marginBottom="10px" color="black" fontSize={22} fontWeight="bold" >
                    VS
                </Text>
                <Flex direction="row">
                    <FontAwesome name="user-circle" size={30} color="black" />
                    <Text marginLeft={5} color="black" fontSize={22} fontWeight="bold" >
                        {fightData.secondPlayer}
                    </Text>
                </Flex>

            </Center>
        </>
    );
};

export default FightInfo;