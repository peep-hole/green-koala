import React from 'react';
import {Box, Button, Center, Text, View, VStack} from "native-base";
import TokenInput from "./TokenInput";
import { Link } from "react-router-native";

const Demo = () => {

    const onPress = (to) => {

    }

    return (
        <View>
            <Box safeAreaTop bg="#065f46" />
            <VStack marginTop="10px">
                <Center>
                    <Link to='/tokenInput'><Text> Token input </Text></Link>
                    <Link to='/registerPlayerForm'><Text> Register player </Text></Link>
                    <Link to='/loginPick'><Text> Login </Text></Link>
                    <Link to='/fightInfo'><Text> Fight info </Text></Link>
                    <Link to='/displayMatch'><Text> Display match </Text></Link>
                    <Link to='/createMatchForm'><Text> Create match form </Text></Link>
                </Center>
            </VStack>
        </View>
    );
};

export default Demo;