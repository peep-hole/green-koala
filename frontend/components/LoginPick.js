import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native';
import React from 'react';
const LoginPick = () => {
    return (
        <>
            <Text>Login Screen</Text>
            <Text>Dołącz jako</Text>
            <View style={rolePickContainer}>
                <Button style={rolePickStyle} title="Sędzia główny" onPress={() => {}} />
                <Button title="Sędzia boczny" onPress={() => {}} />
                <Button title="Organizator" onPress={() => {}} />
            </View>

            <Button title="Info"></Button>
        </>
    );
};

const rolePickContainer = {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
};

const rolePickStyle = { padding: 50, margin: 20 };

export default LoginPick;
