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
                    <IconButton icon={<Icon size="sm" name="menu" color="white" />} />
                    <Link to="/"><Text color="white" fontSize="20" fontWeight="bold">
                        {props.name}
                    </Text></Link>
                </HStack>
                <HStack>
                    <IconButton icon={<Icon name="favorite" size="sm" color="white" />} />
                    <IconButton icon={<Icon name="search" size="sm" color="white" />} />
                    <IconButton icon={<Icon name="more-vert" size="sm" color="white" />} />
                </HStack>
            </HStack>
        </>
    );
};

export default FormHeader;