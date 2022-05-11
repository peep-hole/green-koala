import React from 'react';
import {Box, Button, Center, Text, View, VStack} from "native-base";
import TokenInput from "./TokenInput";
import { Link } from "react-router-native";
import FormHeader from "./util/FormHeader";
import {StyleSheet} from "react-native";

const Demo = () => {

    const onPress = (to) => {

    }

    return (
        <View>
            <FormHeader name="Demo"/>
            <VStack marginTop="10px">
                <Center>
                    <Button style={styles.button}><Link to='/tokenInput'><Text> Token input </Text></Link></Button>
                    <Button style={styles.button}><Link to='/registerPlayerForm'><Text> Register player </Text></Link></Button>
                    <Button style={styles.button}><Link to='/loginPick'><Text> Login </Text></Link></Button>
                    <Button style={styles.button}><Link to='/fightInfo'><Text> Fight info </Text></Link></Button>
                    <Button style={styles.button}><Link to='/displayMatch'><Text> Display match </Text></Link></Button>
                    <Button style={styles.button}><Link to='/createMatchForm'><Text> Create match form </Text></Link></Button>
                    <Button style={styles.button}><Link to='/suggestPoints'><Text> Suggest points </Text></Link></Button>
                </Center>
            </VStack>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        margin: 5
    }
})

export default Demo;