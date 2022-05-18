import React, { useEffect } from 'react';
import { Box, HStack, Icon, Pressable, Center, Text } from "native-base";
import { Link } from "react-router-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const MainRefereeFooter = props => {
    const [selected, setSelected] = React.useState();

    useEffect(() => {
        if (props) {
            setSelected(props.selected)
        }
    }, []);

    return (
        <>
            <Box flex={1} bg="white" safeAreaBottom width="100%" alignSelf="center">
                <Center flex={1}></Center>
                <HStack bg="#065f46" alignItems="center" safeAreaBottom shadow={6}>

                    <Pressable opacity={selected === 0 ? 1 : 0.5} py="3" flex={1} onPress={() => setSelected(0)}>
                        <Link to="/fightHistory" state={props.state}>
                            <Center>
                                <Icon as={<MaterialCommunityIcons name="format-list-bulleted-square" size={24} color="black" />} color="white" size="lg" />
                                <Text color="white" fontSize="16">
                                    History
                                </Text>
                            </Center>
                        </Link>
                    </Pressable>

                    <Pressable opacity={selected === 1 ? 1 : 0.5} py="2" flex={1} onPress={() => setSelected(1)}>
                        <Link to="/displayMatch">
                            <Center>
                                <Icon as={<MaterialIcons name="event-available" size={40} color="black" />} color="white" size="lg" />
                                <Text color="white" fontSize="16">
                                    Match
                                </Text>
                            </Center>
                        </Link>
                    </Pressable>

                    <Pressable opacity={selected === 2 ? 1 : 0.6} py="2" flex={1} onPress={() => setSelected(2)}>
                        <Link to="/fightStats" state={props.state}>
                            <Center>
                                <Icon as={<Ionicons name="stats-chart" size={40} color="black" />} color="white" size="lg" />
                                <Text color="white" fontSize="16">
                                    Statistics
                                </Text>
                            </Center>
                        </Link>
                    </Pressable>
                </HStack>
            </Box>
        </>
    );
};

export default MainRefereeFooter; 