import React from 'react';
import FormHeader from './util/FormHeader';
import MainRefereeFooter from './util/MainRefereeFooter';

const FightStats = () => {

    return (
        <>
            <FormHeader name="Fight Statistics"></FormHeader>

            <MainRefereeFooter selected={2}></MainRefereeFooter>
        </>
    );
};

export default FightStats;