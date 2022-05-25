import React from 'react';
import AdminFooter from './util/AdminFooter';
import FormHeader from './util/FormHeader';
import { Text, Center } from 'native-base';

const TournamentList = () => {

    return (
        <>
            <FormHeader name="Tournaments"></FormHeader>
            <Center>
                <Text marginTop={50} fontSize={25}>
                    TOURNAMENT LIST HERE
                </Text>
            </Center>
            <AdminFooter selected={2}></AdminFooter>
        </>
    );
};

export default TournamentList;
