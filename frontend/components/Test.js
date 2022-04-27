import React, {useEffect, useState} from 'react';
import Api from "./util/Api";
import FormHeader from "./util/FormHeader";
import {View} from "native-base";

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
        <View>
            <FormHeader>
            </FormHeader>
        </View>
    );
};

export default Test;