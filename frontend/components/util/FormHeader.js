import React from 'react';
import { Box, HStack, StatusBar, Text } from "native-base";
import { Link } from "react-router-native"

const FormHeader = (props) => {
    /* #065f46 -> Headers
       #34d399 -> Buttons
     */


    return (
        <>
            <StatusBar bg="#065f46" barStyle="light-content" />
            <Box safeAreaTop bg="#065f46" />
            <HStack marginBottom="30px" bg="#065f46" px="1" py="3" w="100%">
                <Link to="/">
                    <Text marginLeft="20px" color="white" fontSize="20" fontWeight="bold">
                        {props.name}
                    </Text>
                </Link>
            </HStack>
        </>
    );
};

export default FormHeader;