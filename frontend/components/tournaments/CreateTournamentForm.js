import React, {useEffect, useState} from 'react';
import Api from "../util/Api";
import {
    Box,
    Button,
    Center,
    FlatList,
    Flex, HStack,
    Input,
    InputGroup,
    NativeBaseProvider,
    Radio,
    Switch,
    VStack
} from "native-base";
import FormHeaderLink from "../util/FormHeaderLink";
import {Platform, Text} from "react-native";
import {Navigate, useNavigate} from "react-router-native";
import {AntDesign, FontAwesome} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import AdminFooter from "../util/AdminFooter";
import FormHeader from "../util/FormHeader";

const CreateTournamentForm = () => {
    const submitColor = "tertiary.600"
    const padding = "10px"
    const verticalPadding = "10px"
    const horizontalPadding = "30px"
    const marginTop = "10px"
    const errorColor = "#b91c1c"

    const [formData, setData] = React.useState({
        name: '',
        time: '',
        rules: '', // string??
        fighters: []
    });

    const [error, setError] = React.useState('')
    const [tournamentAdd, setTournamentAdded] = React.useState(false)
    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)
    const [dateString, setDateString] = useState(date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear())
    const [timeString, setTimeString] = useState(date.getHours() + ":" + date.getMinutes().toString().padStart(2, "0"))
    const [showPlayers, setShowPlayers] = useState(false)
    const [fightersLoaded, setFightersLoaded] = useState(false)
    const [fighters, setFighters] = useState([])
    const [selectedFighters, setSelectedFighters] = useState([])
    const [selectedFightersId, setSelectedFightersId] = useState([])

    const validate = () => {
        for (const property in formData) {
            if (formData[property] === '' || formData[property] === []) {
                setError(property.toString() + ' is required');
                return false;
            }
        }
        setError('');
        return true;
    };

    const onChange = (event, selectedDate) => {
        const currDate = selectedDate || date
        setShow(Platform.OS === "ios")
        setDate(currDate)
        setDateString(selectedDate.getDate() + "-" + selectedDate.getMonth() + "-" + selectedDate.getFullYear()) // example date format
        setTimeString(selectedDate.getHours() + ":" + selectedDate.getMinutes().toString().padStart(2, "0"))
    }

    const onSubmit = () => {
        if (validate()) {
            Api.post("/tournament/register-tournament", {
                name: formData.name,
                time: formData.time,
                rules: formData.rules,
                fighters: formData.fighters
            })
                .then(() => {
                    console.log("Tournament added")
                    setTournamentAdded(true);
                })
                .catch(e => {
                    console.log(e)
                });
        }
    };

    const getFighters = () => {
        Api.get('/actors/fighters'
        ).then(res => {
            setFighters(res.data);
            setFightersLoaded(true);
        }).catch(e => {
            console.log(e);
        })
    }

    const navigateToFighters = () => {
        setShowPlayers(true)
        getFighters()
    }

    const showMode = (mode) => {
        setShow(true)
        setMode(mode)
    }

    const addPlayer = (player) => {
        setSelectedFighters(selectedFighters => [...selectedFighters, player])
        setSelectedFightersId(selectedFightersId => [...selectedFightersId, player.id])
    }

    const deletePlayer = (player) => {
        setSelectedFighters(selectedFighters.filter(player_ => player_.id !== player.id))
        setSelectedFightersId(selectedFightersId.filter(id => id !== player.id))
    }

    const checkId = (playerId) => {
        return selectedFightersId.includes(playerId.toString())
    }

    const onBack = () => {
        setShowPlayers(false)
    }

    return (
        <NativeBaseProvider>
            {!showPlayers ?
                <>
                    <FormHeaderLink pathname="tournamentList" name="New tournament"/>
                    <VStack space={padding} w="100%" px={horizontalPadding} py={verticalPadding}>
                        <Input padding={padding} placeholder="Name" onChangeText={value => {
                            setData({...formData, name: value})
                        }}/>
                        <Center style={{marginTop: "10px"}}>
                            <Flex direction="row">
                                <Button
                                    onPress={() => showMode('date')}
                                    variant="outline"
                                    borderColor="#ccc"
                                    _text={{
                                        color: "#ccc"
                                    }}>
                                    Select date
                                </Button>
                                <Center marginLeft="5px">
                                    <FontAwesome name="calendar" size={30}> </FontAwesome>
                                </Center>
                            </Flex>
                            <Flex direction="row" marginTop="30px" marginBottom="30px">
                                <Button
                                    onPress={() => showMode('time')}
                                    variant="outline"
                                    borderColor="#ccc"
                                    _text={{
                                        color: "#ccc"
                                    }}>
                                    Select time
                                </Button>
                                <Center marginLeft="5px">
                                    <FontAwesome name="clock-o" size={30}> </FontAwesome>
                                </Center>
                            </Flex>
                            <Text marginTop="30px" marginRight="30px">Date: {dateString} Time: {timeString}</Text>
                        </Center>
                    </VStack>
                    <Center padding={padding} marginTop={marginTop}>
                        <Button
                            onPress={navigateToFighters}
                            backgroundColor={submitColor}>
                            Add player
                        </Button>
                    </Center>
                    {tournamentAdd && <Navigate to="/fighterList"/>}
                    {show && (
                        <DateTimePicker
                            value={date}
                            testID="dateTimePicker"
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}>
                        </DateTimePicker>
                    )} </> :
                <>
                    {fightersLoaded && <>
                        <FormHeader name="Add players"/>
                        <FlatList height="50%" margin={3} backgroundColor="gray.200"
                                  data={fighters} renderItem={
                            ({item}) =>
                                <Box borderBottomWidth={1} borderTopWidth={1} _dark={{borderColor: "gray.800"}}
                                     borderColor="coolGray.400" pl="4" pr="5" py="2">
                                    <HStack space={3} flexDirection='row' justifyContent='space-between'
                                            alignItems="stretch">
                                        <Box alignItems="center">
                                            <Text _dark={{color: "warmGray.50"}} color="coolGray.800" bold
                                                  fontSize="16px">
                                                {item.name} {item.surname}
                                            </Text>
                                        </Box>
                                            {checkId(item.id) ? <AntDesign onPress={() => deletePlayer(item)} justifyContent="flex-end"
                                                                           name="pluscircle" size={24} color="#065f46"/>
                                                : <AntDesign onPress={() => addPlayer(item)} justifyContent="flex-end"
                                                             name="pluscircleo" size={24} color="#065f46"/>
                                            }
                                    </HStack>
                                </Box>
                        } keyExtractor={item => item.id}/>
                        <Center padding={padding} marginTop={marginTop}>
                            <Button
                                onPress={onSubmit}
                                backgroundColor={submitColor}>
                                Submit
                            </Button>
                            <Button
                                onPress={onBack}
                                backgroundColor={submitColor}
                                marginTop="20px">
                                Go back
                            </Button>
                        </Center>
                        <Center px={horizontalPadding} py={verticalPadding}>
                            <Text style={{color: errorColor, fontWeight: "600"}}>{error}</Text>
                        </Center>
                    </>}
                    <AdminFooter selected={0}/> </>
            }
        </NativeBaseProvider>
    )
};

export default CreateTournamentForm;