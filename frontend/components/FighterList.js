import React from 'react';
import AdminFooter from './util/AdminFooter';
import FormHeaderLink from './util/FormHeaderLink';


const FighterList = () => {



    return (
        <>
            <FormHeaderLink pathname="" name="Fighters"></FormHeaderLink>
            <AdminFooter selected={0}></AdminFooter>
        </>
    );
};

export default FighterList;
