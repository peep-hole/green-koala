import React, {useEffect, useState} from 'react';
import sock from "./util/Websocket";
import {over} from 'stompjs';
import {NativeBaseProvider, Button} from 'native-base';

let stompClient = null;

const Test = () => {
    const [userData, setUserData] = useState({
        connected: false,
        message: ''
    }) 
    const [response, setResponse] = useState('');

    stompClient = over(sock);
    stompClient.connect({}, onConnected, onError);

    const onConnected = () => {
        stompClient.subscribe('/test/response', onMessageReceived);
        stompClient.send("/backend/message", {}, JSON.stringify({
            message: "Join"
        }));
        setUserData({...userData, "connected": true});
    }

    const onMessageReceived = (payload) => {
        let message = JSON.parse(payload.body)["message"];
        setResponse(message);
    }

    const onError = (error) => {
        console.log("Error" + error);
    }

    const sendMessage = () => {
        if(stompClient){
        let message ={
            message: "Hardcoded message"
        };
        stompClient.send('/backend/message', {}, JSON.stringify(message));
        }
    }

    return (
        <>
        {userData.connected? "YES": "NO"}
        <NativeBaseProvider>
        <Button 
          onPress={sendMessage} >
              Send something
        </Button>
        </NativeBaseProvider>
        {response}
        </>
    );
};

export default Test;
