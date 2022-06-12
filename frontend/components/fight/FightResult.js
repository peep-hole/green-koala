import React, { useEffect, useState } from 'react';
import Api from '../util/Api';
import FormHeaderLink from '../util/FormHeaderLink';
import { Center, Flex, Text, ScrollView } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { useLocation} from 'react-router-native';


const FightResult = () => {

    const props = useLocation();
    const [fightData, setFightData] = useState({});
    const [fighter1, setFirstFighter] = useState({});
    const [fighter2, setSecondFighter] = useState({});
    const [loading, setLoading] = useState(true);
    const [f1loading, setF1Loading] = useState(true);
    const [f2loading, setF2Loading] = useState(true);

    useEffect(() => {

        Api.get('/matches/id/' + props.state.fightId).then(res => {
            setFightData(res.data);
            const fighterId1 = res.data.fighterId1;
            const fighterId2 = res.data.fighterId2;
            setLoading(false);

            Api.get('/actors/fighters/id/' + fighterId1).then(res => {
                setFirstFighter(res.data);
                setF1Loading(false);
            });

            Api.get('/actors/fighters/id/' + fighterId2).then(res => {
                setSecondFighter(res.data);
                setF2Loading(false);
            });
        });
    }, []);

    return (
        <>
            <FormHeaderLink pathname="matchList" state={{}} name="Fight Results" />
            <ScrollView>
                <Center>
                    {/* Fight date-time */}
                    <Flex direction="row">
                        <FontAwesome name="calendar" size={28} color="black" />
                        <Text marginLeft={5} color="black" fontSize={22} fontWeight="bold">
                            {!loading && fightData.date + ' ' + fightData.time}
                        </Text>
                    </Flex>

                    {/* Fighter1 vs Fighter2 */}
                    <Flex
                        direction="row"
                        marginTop="15px"
                        rounded="lg"
                        borderColor="black"
                        borderWidth="1"
                        p="4px"
                    >
                        <FontAwesome name="user-circle" size={28} color="black" />
                        <Text marginLeft={5} color="black" fontSize={20} fontWeight="bold">
                            {!f1loading && fighter1.name + ' ' + fighter1.surname}
                        </Text>
                    </Flex>
                    <Text
                        marginTop="5px"
                        marginBottom="5px"
                        color="black"
                        fontSize={22}
                        fontWeight="bold"
                    >
                        VS
                    </Text>
                    <Flex
                        direction="row"
                        rounded="lg"
                        borderColor="black"
                        borderWidth="1"
                        p="4px"
                    >
                        <FontAwesome name="user-circle" size={28} color="black" />
                        <Text marginLeft={5} color="black" fontSize={20} fontWeight="bold">
                            {!f2loading && fighter2.name + ' ' + fighter2.surname}
                        </Text>
                    </Flex>

                    <Text marginTop={50} fontSize={25}>
                        RESULT COMPONENT HERE
                    </Text>
                </Center>
            </ScrollView>
        </>
    );
};

export default FightResult;
