import React from 'react';
import { Box, HStack, StatusBar, Text, Spacer } from "native-base";
import { Link } from "react-router-native"
import { AntDesign } from '@expo/vector-icons';


const FormHeaderLink = (props) => {
    /* #065f46 -> Headers
       #34d399 -> Buttons
     */


    return (
        <>
            <StatusBar bg="#065f46" barStyle="light-content" />
            <Box safeAreaTop bg="#065f46" />
            <HStack marginBottom="30px" bg="#065f46" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%">
                <HStack alignItems="center">
                    <Link to={"/" + props.pathname} state={props.state}>
                        <AntDesign name="back" size={24} color="black" />
                    </Link>
                    
                    <Text marginLeft={30} color="white" fontSize="20" fontWeight="bold">
                        {props.name}
                    </Text>
                </HStack>
                <HStack>
                </HStack>
            </HStack>
        </>
    );
};

export default FormHeaderLink;