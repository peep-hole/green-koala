import React from 'react';
import {useEffect, useState} from "react";
import Api from "./util/Api";

const Test = () => {
    const [test, setTest] = useState('')

    useEffect(() => {
        Api.get("/test"
        ).then(res => {
            setTest(res.data)
        }).catch(e => {
            console.log(e)
        })
    })

    return (
        <div>
            {test}
        </div>
    );
};

export default Test;