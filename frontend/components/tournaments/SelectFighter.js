import React, {useEffect, useState} from 'react';
import FormHeader from "../util/FormHeader";
import {Box, FlatList, Flex, HStack, Text, View} from "native-base";
import {Link} from "react-router-native";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import Api from "../util/Api";

const SelectFighter = () => {
    const [fightersLoaded, setFightersLoaded] = useState(false)
    const [fighters, setFighters] = useState([])

    useEffect(() => {
        Api.get('/tournaments')
            .then(res => {
                setFighters(res.data)
                setFightersLoaded(true)
            }).catch(e => {
                console.log(e)
            })
    })

    return (
        <View>
            <FormHeader name="Fighters"/>
            {fightersLoaded && <>
                <FlatList height="50vh" margin={3} backgroundColor="gray.200"
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
                <Flex direction="row-reverse" marginRight="15px" marginTop="2px">
                    <Link to="/registerPlayerForm">
                        <Box width="58px" height="58px" borderRadius="100" borderWidth="3px" borderColor="#065f46" backgroundColor="#065f46" p="10px" alignItems="center">
                            <Ionicons name="person-add" size={30} color="white" />
                        </Box>
                    </Link>
                </Flex>
            </>}
        <View/>
    );
};

export default SelectFighter;