import React, {useEffect, useState} from 'react';
import {Box, Button, Center, HStack, StatusBar, Text, View} from "native-base";
import { FontAwesome } from '@expo/vector-icons';
import {StyleSheet} from "react-native";
import Api from "./util/Api";

const Timer = () => {
    const bgColor = "tertiary.800"
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [isActive, setIsActive] = useState(false)

    const toggle = () => {
        setIsActive(!isActive)
    }

    const reset = () => {
        sendTimeToDatabase('-end')
        setMinutes(0)
        setSeconds(0)
        setIsActive(false)
    }

    const sendTimeToDatabase = (param) => {
        Api.post(`/timer${param}/token`, {
            minutes: minutes,
            seconds: seconds
        }).then(res => {
            console.log(res)
        }).catch(e => {
            console.log(e)
        })
    }

    useEffect(() => {
        let interval = null
        if(isActive){
            interval = setInterval(() => {
                if(seconds === 59){
                    setMinutes(minutes + 1)
                    setSeconds(0)
                } else{
                    setSeconds(seconds + 1)
                }
                sendTimeToDatabase('')
            }, 1000)
        } else if (!isActive && (seconds !== 0 && minutes !== 0)){
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [isActive, seconds])

    return (
        <>
            <Box safeAreaTop />
            <Center>
            <HStack bg={bgColor} px="1" py="3" justifyContent="center" alignItems="center" w="100%">
                {isActive? <FontAwesome style={styles.ionicons} name="pause" size={24} color="black" onPress={toggle}/> :
                    <FontAwesome style={styles.ionicons} name="play" size={24} color="black" onPress={toggle}/>}
                <Text fontSize={24}>{minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0")}</Text>
                <FontAwesome style={styles.ionicons} name="stop" size={24} color="black" onPress={reset}/>
            </HStack>
            </Center>
        </>
    )
};

const styles = StyleSheet.create({
    ionicons: {
        marginLeft: 20,
        marginRight: 20
    }
})

export default Timer;