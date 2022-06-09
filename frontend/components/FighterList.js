import React, { useEffect, useState } from 'react';
import AdminFooter from './util/AdminFooter';
import FormHeader from './util/FormHeader';
import { Flex, Box, FlatList, HStack, Text } from 'native-base';
import Api from './util/Api';
import { Link } from "react-router-native";
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


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

    return (
        <>
            <FormHeader name="Fighters"></FormHeader>
            {fightersLoaded && <>
                <FlatList height="50%" margin={3} backgroundColor="gray.200"
                    data={fighters} renderItem={
                        ({ item }) =>
                            <Link to="/fighterInfo" state={{ fighterData: item }} >
                                <Box borderBottomWidth={1} borderTopWidth={1} _dark={{ borderColor: "gray.800" }} borderColor="coolGray.400" pl="4" pr="5" py="2">
                                    <HStack space={3} flexDirection='row' justifyContent='space-between' alignItems="stretch">
                                        <Box alignItems="center">
                                            <Text _dark={{ color: "warmGray.50" }} color="coolGray.800" bold fontSize="16px">
                                                {item.name} {item.surname}
                                            </Text>
                                        </Box>
                                        <Link to="/deleteFighter" state={{ fighterData: item }} >
                                            <AntDesign justifyContent="flex-end" name="delete" size={24} color="#065f46" />
                                        </Link>
                                    </HStack>
                                </Box>
                            </Link>
                    } keyExtractor={item => item.id} />
                <Flex direction="row-reverse" marginRight="14px" marginTop="3px">
                    <Link to="/registerPlayerForm">
                        <Box width="57px" height="57px" marginRight="14px" borderRadius="100" borderWidth="3px" borderColor="#065f46" backgroundColor="#065f46" p="10px" alignItems="center">
                            <Ionicons name="person-add" size={30} color="white" />
                        </Box>
                    </Link>
                </Flex>
            </>}
            <AdminFooter selected={0}></AdminFooter>
        </>
    );
};

export default FighterList;
