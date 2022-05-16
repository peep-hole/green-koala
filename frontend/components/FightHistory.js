import React from 'react';
import FormHeader from './util/FormHeader';
import MainRefereeFooter from './util/MainRefereeFooter';

const FightHistory = () => {

    return (
        <>
            <FormHeader name="Fight History"></FormHeader>

            <MainRefereeFooter selected={0}></MainRefereeFooter>
        </>
    );
};

export default FightHistory;