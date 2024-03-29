import React, {useEffect, useState} from 'react';
import url from "./util/Websocket";
import {over} from 'stompjs';
import {NativeBaseProvider, Button} from 'native-base';
import SockJS from 'sockjs-client';

let sock = null;
let stompClient = null;

const Test = () => {
    
    const [userData, setUserData] = useState({
        connected: false,
        message: ''
    });
    const [response, setResponse] = useState('');

    useEffect(() => {
        sock = new SockJS(url);
        stompClient = over(sock);
        stompClient.connect({}, onConnected, onError);
    }, []);

    const onConnected = () => {
        stompClient.subscribe("/response/timer", onMessageReceived);
        stompClient.send("/timer", {}, JSON.stringify({
            action: "GET"
        }));
        setUserData({...userData, "connected": true});
    }

    const onMessageReceived = (payload) => {
        let message = payload.body;
        setResponse(message)
    }

    const onError = (error) => {
        console.log("Error: " + error);
    }

    const sendStart = () => {
        if (stompClient) {
            let message = {
                action: "START"
            };
            stompClient.send('/timer', {}, JSON.stringify(message));
        }
    }

    const sendStop = () => {
        if (stompClient) {
            let message = {
                action: "STOP"
            };
            stompClient.send('/timer', {}, JSON.stringify(message));
        }
    }

    const sendGet = () => {
        if (stompClient) {
            let message = {
                action: "GET"
            };
            stompClient.send('/timer', {}, JSON.stringify(message));
        }
    }

    const sendRestart = () => {
        if (stompClient) {
            let message = {
                action: "RESTART"
            };
            stompClient.send('/timer', {}, JSON.stringify(message));
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
                <Button
                    onPress={sendRestart}>
                    Send RESTART
                </Button>
            </NativeBaseProvider>
            {response}
        </>
    );
};

export default Test;
