import React, {useEffect, useState} from 'react';
import {Button, HStack, Modal, Text} from "native-base";
import { FontAwesome } from '@expo/vector-icons';
import {StyleSheet} from "react-native";
import url from "./util/Websocket";
import SockJS from 'sockjs-client';
import { over } from 'stompjs';

let stompClient = null
let sock = null

const Timer = props => {
    const bg= "#065f46"
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [isActive, setIsActive] = useState(false)
    const [showModal1, setShowModal1] = useState(false)
    const [showModal2, setShowModal2] = useState(false)

    useEffect(() => {
        sock = new SockJS(url)
        stompClient = over(sock)
        stompClient.debug = null
        stompClient.connect({}, onConnected, onError)
    }, [])


    const onConnected = () => {
        stompClient.subscribe("/response/timer", onMessageReceived)
        stompClient.send("/timer", {}, JSON.stringify({
            action: "GET"
        }));
    }

    const onError = (error) => {
        console.log("Error: " + error)
    }

    const onMessageReceived = (payload) => {
        if(JSON.parse(payload.body)['timerRunning']) {
            setIsActive(true)
        }
        let millis = JSON.parse(payload.body).time
        let minutes = Math.floor(millis / 60000)
        let seconds = Number(((millis % 60000) / 1000).toFixed(0))
        setMinutes(minutes)
        setSeconds(seconds)
    }

    const toggle = () => {
        if(!isActive) {
            sendAction("START")
        } else {
            sendAction("STOP")
        }
        setIsActive(!isActive)
    }

    const reset = () => {
        if(isActive){
            setIsActive(!isActive)
            sendAction("STOP")
        }
        setShowModal1(true)
    }

    const end = () => {
        setShowModal2(true)
        sendAction("STOP")
    }

    const send = (action) => {
        let message = {
            action: action
        };
        stompClient.send('/timer', {}, JSON.stringify(message));
    }

    const sendAction = (action) => {
        if(stompClient) {
            switch (action) {
                case "START":
                    send(action)
                    break
                case "STOP":
                    send(action)
                    break
                case "RESET":
                    send(action)
                    break
                case "END":
                    send(action)
                    break
            }
        }
    }

    const isOvertime = () => {

        if(props.maxTime < minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0")){
            return true;
        }
        return false;
    }


    if(props.isMain){
        return <>
                <HStack bg={bg} px="1" py="3" justifyContent="center" alignItems="center" w="100%">
                    {isActive? <FontAwesome style={styles.ionicons} name="pause" size={24} color="black" onPress={toggle}/> :
                    <FontAwesome style={styles.ionicons} name="play" size={24} color="black" onPress={toggle}/>}
                    {!isOvertime() && <Text fontSize={24} color="white">{minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0")}</Text>}
                    {isOvertime() && <Text fontSize={24} color="red.500">{minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0")}</Text>}
                    <FontAwesome style={styles.ionicons} name="stop" size={24} color="black" onPress={reset}/>
                    <FontAwesome style={styles.closeIcon} name="close" size={32} color="black" onPress={end}/>
                </HStack>
            <Modal isOpen={showModal1} onClose={() => setShowModal1(false)}>
                <Modal.Content>
                    <Modal.CloseButton/>
                    <Modal.Header>Are your sure?</Modal.Header>
                    <Modal.Body>Are you sure you want to reset the timer?</Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button
                                variant="ghost"
                                colorScheme="blueGray"
                                onPress={() => {
                                    sendAction("RESET")
                                    setIsActive(false)
                                    setShowModal1(false)
                                }}
                            >
                                <Text>Yes</Text>
                            </Button>
                            <Button
                                variant="ghost"
                                colorScheme="blueGray"
                                onPress={() => {
                                    setShowModal1(false)
                                    sendAction("START")
                                    setIsActive(true)
                                }}
                            >
                                <Text>No</Text>
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <Modal isOpen={showModal2} onClose={() => setShowModal2(false)}>
                <Modal.Content>
                    <Modal.CloseButton/>
                    <Modal.Header>Are your sure?</Modal.Header>
                    <Modal.Body>Are you sure you want to reset the timer?</Modal.Body>
                    <Modal.Footer>
                        <Button.Group space={2}>
                            <Button
                                variant="ghost"
                                colorScheme="blueGray"
                                onPress={() => {
                                    sendAction("END")
                                    setIsActive(false)
                                    setShowModal2(false)
                                }}
                            >
                                <Text>Yes</Text>
                            </Button>
                            <Button
                                variant="ghost"
                                colorScheme="blueGray"
                                onPress={() => {
                                    setShowModal2(false)
                                    sendAction("START")
                                    setIsActive(true)
                                }}
                            >
                                <Text>No</Text>
                            </Button>
                        </Button.Group>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
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