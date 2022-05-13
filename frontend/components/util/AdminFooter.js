import React, { useEffect } from 'react';
import { Box, HStack, Icon, Pressable, Center, Text } from "native-base";
import { Link } from "react-router-native"
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';


const AdminFooter = props => {
    const [selected, setSelected] = React.useState(1);

    useEffect(() => {
        if (props) {
            setSelected(props.selected)
        }
    }, []);

    return (
        <>
            <Box flex={1} bg="white" safeAreaTop width="100%" alignSelf="center">
                <Center flex={1}></Center>
                <HStack bg="#065f46" alignItems="center" safeAreaBottom shadow={6}>

                    <Pressable opacity={selected === 0 ? 1 : 0.5} py="3" flex={1} onPress={() => setSelected(0)}>
                        <Link to="/fighterList">
                            <Center>
                                <Icon as={<Entypo name="users" size={40} color="black" />} color="white" size="lg" />
                                <Text color="white" fontSize="16">
                                    Fighters
                                </Text>
                            </Center>
                        </Link>
                    </Pressable>

                    <Pressable opacity={selected === 1 ? 1 : 0.5} py="2" flex={1} onPress={() => setSelected(1)}>
                        <Link to="/matchList">
                            <Center>
                                <Icon as={<MaterialIcons name="event-note" size={40} color="black" />} color="white" size="lg" />
                                <Text color="white" fontSize="16">
                                    Matches
                                </Text>
                            </Center>
                        </Link>
                    </Pressable>

                    <Pressable opacity={selected === 2 ? 1 : 0.6} py="2" flex={1} onPress={() => setSelected(2)}>
                        <Link to="/tournamentList">
                            <Center>
                                <Icon as={<MaterialIcons name="emoji-events" size={40} color="black" />} color="white" size="lg" />
                                <Text color="white" fontSize="16">
                                    Tournaments
                                </Text>
                            </Center>
                        </Link>
                    </Pressable>
                </HStack>
            </Box>
        </>
    );
};

export default AdminFooter;