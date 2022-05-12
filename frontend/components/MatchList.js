import React, { useEffect, useState } from 'react';
import Api from './util/Api';
import FormHeader from './util/FormHeader';
import { VStack, Button, Center, Box, Heading, FlatList, HStack, Spacer, Text, ScrollView } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';

const MatchList = () => {

    const [matches, setMatches] = useState([]);

    const [matchesLoaded, setMatchesLoaded] = useState(false);


    const getAllMatches = () => {
        Api.get('/matches/all' // TODO check if proper endpont?
        ).then(res => {
            setMatches(res.data);
            console.log(res.data);
            setMatchesLoaded(true);
        }).catch(e => {
            console.log(e);
        })
    }

    useEffect(() => {
        getAllMatches();
        console.log(matches);
    }, [])


    return (
        <>
            <FormHeader name="Matches" />
            <ScrollView id="oncoming_matches">
                
            </ScrollView>

            <ScrollView id="history">
                <Center>

                </Center>
            </ScrollView>

            {/* Here footer component containing administrator's navigation bar */}
        </>
    );
};

export default MatchList;
