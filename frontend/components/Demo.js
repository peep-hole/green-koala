import React from 'react';
import { Button, Center, Text, View, VStack } from "native-base";
import { Link } from "react-router-native";
import FormHeader from "./util/FormHeader";
import { StyleSheet } from "react-native";

const Demo = () => {
    return (
        <View>
            <FormHeader path='/' name="Demo" />
            <VStack marginTop="10px">
                <Center>
                    <Text>Production:</Text>
                    <Button style={styles.button}><Link to='/loginPick'><Text> Start App </Text></Link></Button>
                    <Text>Test Views:</Text>
                    <Button style={styles.button}><Link to='/registerPlayerForm'><Text> Register player </Text></Link></Button>
                    <Button style={styles.button}><Link to='/fightInfo' state={{ fightId: "ea5d74b4-c70b-11ec-9d64-0242ac120002" }}><Text> Fight Info Demo </Text></Link></Button>
                    <Button style={styles.button}><Link to='/displayMatch'><Text> Display match </Text></Link></Button>
                    <Button style={styles.button}><Link to='/createMatchForm'><Text> Create match form </Text></Link></Button>
                    <Button style={styles.button}><Link to='/matchList'><Text>Matches</Text></Link></Button>
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