import React from 'react';
import {Box, HStack, Icon, IconButton, StatusBar, Text} from "native-base";
import {Link} from "react-router-native"

const FormHeader = (props) => {
    /* #065f46 -> Headers
       #34d399 -> Buttons
     */


    return (
        <>
            <StatusBar bg="#065f46" barStyle="light-content" />
            <Box safeAreaTop bg="#065f46" />
            <HStack marginBottom="30px" bg="#065f46" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%">
                <HStack alignItems="center">
                    <Link to="/"><Text color="white" fontSize="20" fontWeight="bold">
                        {props.name}
                    </Text></Link>
                </HStack>
            </HStack>
        </>
    );
};

export default FormHeader;