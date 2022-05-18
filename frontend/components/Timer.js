import React, {useEffect, useState} from 'react';
import {HStack, Text} from "native-base";
import { FontAwesome } from '@expo/vector-icons';
import {StyleSheet, Alert} from "react-native";
import url from "./util/Websocket";
import SockJS from 'sockjs-client';
import { over } from 'stompjs';

let stompClient = null
let sock = null

const Timer = props => {
    const bg= "black"
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        sock = new SockJS(url)
        stompClient = over(sock)
        stompClient.connect({}, onConnected, onError)
    }, [])


    const onConnected = () => {
        console.log("CONNECTED")
        stompClient.subscribe("/response/timer", onMessageReceived)
        stompClient.send("/timer", {}, JSON.stringify({
            action: "GET"
        }));
    }

    const onError = (error) => {
        console.log("Error: " + error)
    }

    const onMessageReceived = (payload) => {
        let millis = JSON.parse(payload.body).time
        let minutes = Math.floor(millis / 60000)
        let seconds = Number(((millis % 60000) / 1000).toFixed(0))
        setMinutes(minutes)
        setSeconds(seconds)
    }

    const toggle = () => {
        if(!isActive) {
            sendStart()
        } else {
            sendStop()
        }
        setIsActive(!isActive)
    }

    const reset = () => {
        if(isActive){
            setIsActive(!isActive)
        }
        sendReset()
        return Alert.alert(
            "Are your sure?",
            "Are you sure you want to reset the timer?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        sendReset()
                    },
                },
                {
                    text: "No",
                },
            ]
        );
    }

    const end = () => {
        sendEnd()
        return Alert.alert(
            "Are your sure?",
            "Are you sure you want to end the match?",
            [
                {
                    text: "Yes",
                    onPress: () => {
                        sendEnd()
                    },
                },
                {
                    text: "No",
                },
            ]
        );
    }

    const sendStart = () => {
        if(stompClient) {
            let message = {
                action: "START"
            };
            stompClient.send('/timer', {}, JSON.stringify(message));
        }
    }

    const sendStop = () => {
        if(stompClient) {
            let message = {
                action: "STOP"
            };
            stompClient.send('/timer', {}, JSON.stringify(message));
        }
    }

    const sendReset = () => {
        if(stompClient) {
            let message = {
                action: "RESET"
            };
            stompClient.send('/timer', {}, JSON.stringify(message));
        }
    }

    const sendEnd = () => { // waiting for endpoint from backend
        if(stompClient) {
            let message = {
                action: "END"
            };
            stompClient.send('/timer', {}, JSON.stringify(message));
        }
    }

    if(props.isMain){
        return <>
                <HStack bg={bg} px="1" py="3" justifyContent="center" alignItems="center" w="100%">
                    {isActive? <FontAwesome style={styles.ionicons} name="pause" size={24} color="black" onPress={toggle}/> :
                    <FontAwesome style={styles.ionicons} name="play" size={24} color="black" onPress={toggle}/>}
                    <Text fontSize={24} color="white">{minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0")}</Text>
                    <FontAwesome style={styles.ionicons} name="stop" size={24} color="black" onPress={reset}/>
                    <FontAwesome style={styles.closeIcon} name="close" size={32} color="black" onPress={end}/>
                </HStack>
        </>
    } else {
        return <HStack bg={bg} px="1" py="3" justifyContent="center" alignItems="center" w="100%">
                    <Text fontSize={24}>{minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0")}</Text>
                </HStack>
    }
};

const styles = StyleSheet.create({
    ionicons: {
        marginLeft: 20,
        marginRight: 20,
        color: "white"
    },
    closeIcon: {
        position: "absolute",
        marginLeft: "85%",
        color: "white"
    }
})

export default Timer;