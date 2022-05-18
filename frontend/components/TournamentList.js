import React from 'react';
import AdminFooter from './util/AdminFooter';
import FormHeaderLink from './util/FormHeaderLink';

const TournamentList = () => {

    return (
        <>
            <FormHeaderLink pathname="" name="Tournaments"></FormHeaderLink>

            <AdminFooter selected={2}></AdminFooter>
        </>
    );
};

export default TournamentList;
