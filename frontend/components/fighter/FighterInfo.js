import React, {useEffect} from 'react';
import FormHeaderLink from '../util/FormHeaderLink';
import {Center, Flex, ScrollView, Text} from 'native-base';
import {FontAwesome} from '@expo/vector-icons';
import {useLocation} from 'react-router-native';

const FighterInfo = () => {

    const props = useLocation();

    useEffect(() => {
        //maybe here get some stats for fighter
    }, []);

    return (
        <>
            <FormHeaderLink pathname="fighterList" state={{}} name="Fighter Details" />
            <ScrollView>
                <Center>
                    <Flex direction="row" marginTop="15px" rounded="lg" borderColor="black" borderWidth="1" p="10px">
                        <FontAwesome name="user-circle" size={28} color="black" />
                        <Text marginLeft={5} color="black" fontSize={20} fontWeight="bold">
                            {props.state.fighterData.name + ' ' + props.state.fighterData.surname}
                        </Text>
                    </Flex>

                    {/* Some player info */}
                    <Text marginTop="20px" color="black" fontSize={18} fontWeight="bold">
                        Fighter data:
                    </Text>
                    <Text marginTop="15px" color="black" fontSize={18} >
                        Age: {props.state.fighterData.age}
                    </Text>
                    <Text marginTop="10px" color="black" fontSize={18} >
                        Weight: {props.state.fighterData.weight}
                    </Text>

                    <Text marginTop="40px" color="black" fontSize={18} fontWeight="bold">
                        HERE STATS?
                    </Text>

                </Center>
            </ScrollView>
        </>
    );
};

export default FighterInfo;
