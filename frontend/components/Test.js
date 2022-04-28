import React, {useEffect, useState} from 'react';
import sock from "./util/Websocket";
import {over} from 'stompjs';
import {NativeBaseProvider, Button} from 'native-base';

let stompClient = null;

const Test = () => {
    const [userData, setUserData] = useState({
        connected: false,
        message: ''
    });
    const [response, setResponse] = useState('');

    useEffect(() => {
        stompClient = over(sock);
        stompClient.connect({}, onConnected, onError);
    }, []);

    const onConnected = () => {
        console.log("CONNECTED")
        stompClient.subscribe("/response/timer", onMessageReceived);
        stompClient.send("/backend/timer", {}, JSON.stringify({
            action: "GET"
        }));
        setUserData({...userData, "connected": true});
    }

    const onMessageReceived = (payload) => {
        let message = payload.body;
        console.log(message)
        setResponse(message);
    }

    const onError = (error) => {
        console.log("Error: " + error);
    }

    const sendStart = () => {
        if (stompClient) {
            let message = {
                action: "START"
            };
            stompClient.send('/backend/timer', {}, JSON.stringify(message));
        }
    }

    const sendStop = () => {
        if (stompClient) {
            let message = {
                action: "STOP"
            };
            stompClient.send('/backend/timer', {}, JSON.stringify(message));
        }
    }

    const sendGet = () => {
        if (stompClient) {
            let message = {
                action: "GET"
            };
            stompClient.send('/backend/timer', {}, JSON.stringify(message));
        }
    }

    return (
        <>
            {userData.connected ? "YES" : "NO"}
            <NativeBaseProvider>
                <Button
                    onPress={sendStart}>
                    Send start
                </Button>
                <Button
                    onPress={sendStop}>
                    Send Stop
                </Button>
                <Button
                    onPress={sendGet}>
                    Send get
                </Button>
            </NativeBaseProvider>
            {response}
        </>
    );
};

export default Test;
