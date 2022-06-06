import React, { useEffect, useState } from 'react';
import AdminFooter from './util/AdminFooter';
import FormHeader from './util/FormHeader';
import { Flex, Box, FlatList, HStack, Text } from 'native-base';
import Api from './util/Api';
import { Link } from "react-router-native";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const FighterList = () => {



    const [fighters, setFighters] = useState([]);
    const [fightersLoaded, setFightersLoaded] = useState(false);

    const getFighters = () => {
        Api.get('/actors/fighters'
        ).then(res => {
            setFighters(res.data);
            // console.log(res.data);
            setFightersLoaded(true);
        }).catch(e => {
            console.log(e);
        })
    }

    useEffect(() => {
        getFighters();
        // console.log(matches);
    }, [])

    const deleteFighter = (fighterId) => {
        // Api.get('/actors/fighters'
        // ).then(res => {
        //     setFighters(res.data);
        //     // console.log(res.data);
        //     setFightersLoaded(true);
        // }).catch(e => {
        //     console.log(e);
        // })
    }

    return (
        <>
            <FormHeader name="Fighters"></FormHeader>
            <Box >
                <FlatList margin={3} backgroundColor="gray.200"
                    data={fighters} renderItem={
                        ({ item }) =>
                            <Link to="/fighterInfo" state={{ fighterData: item }} >
                                <Box borderBottomWidth={1} borderTopWidth={1} _dark={{ borderColor: "gray.800" }} borderColor="coolGray.400" pl="4" pr="5" py="2">
                                    <HStack space={3} flexDirection='row' justifyContent='space-between'>
                                        <Text _dark={{ color: "warmGray.50" }} color="coolGray.800" bold>
                                            {item.name} {item.surname}
                                        </Text>
                                        <AntDesign justifyContent="flex-end" name="delete" size={24} color="black" />
                                    </HStack>
                                </Box>
                            </Link>
                    } keyExtractor={item => item.id} />
            </Box>
            <Flex direction="row-reverse">
                <Link to="/registerPlayerForm">
                    <MaterialIcons name="add-circle-outline" size={70} color="black" />
                </Link>
            </Flex>

            <AdminFooter selected={0}></AdminFooter>
        </>
    );
};

export default FighterList;
