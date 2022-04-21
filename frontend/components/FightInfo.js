import React, { useEffect, useState } from 'react';
import { Input, NativeBaseProvider, Text, Center, Button, VStack } from 'native-base';
import FormHeader from './util/FormHeader';
import { FontAwesome } from '@expo/vector-icons';

const FightInfo = () => {
    return (
        <>
            <FormHeader name="Fight Details"></FormHeader>
            <Center>
                <FontAwesome name="handshake-o" size={200}></FontAwesome>

                <Text marginBottom="10px" color="black" fontSize={20} fontWeight="bold">
                    Test
                </Text>
            </Center>
        </>
    );
};

export default FightInfo;