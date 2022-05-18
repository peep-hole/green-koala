import React from 'react';
import AdminFooter from './util/AdminFooter';
import FormHeader from './util/FormHeader';
import { Text, Center } from 'native-base';


const FighterList = () => {

    return (
        <>
            <FormHeader name="Fighters"></FormHeader>
            <Center>
                <Text marginTop={50} fontSize="25">
                    FIGHTER LIST HERE
                </Text>
            </Center>

            <AdminFooter selected={0}></AdminFooter>
        </>
    );
};

export default FighterList;
