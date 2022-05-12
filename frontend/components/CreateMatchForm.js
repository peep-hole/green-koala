import React, {useEffect, useState} from 'react';
import FormHeaderLink from "./util/FormHeaderLink";
import {Button, Center, Flex, FormControl, Text, VStack} from "native-base";
import Api from "./util/Api";
import {FontAwesome} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker"
import SearchableDropdown from "react-native-searchable-dropdown";
import {Platform, StyleSheet} from "react-native";

const CreateMatchForm = () => {
    const [firstPlayer, setFirstPlayer] = useState('')
    const [secondPlayer, setSecondPlayer] = useState('')

    const [players, setPlayers] = useState([])

    const [date, setDate] = useState(new Date())
    const [mode , setMode] = useState('date')
    const [show, setShow] = useState(false)
    const [showSearch1, setShowSearch1] = useState(true)
    const [showSearch2, setShowSearch2] = useState(true)

    const [dateString, setDateString] = useState(date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear())
    const [timeString, setTimeString] = useState(date.getHours() + ":" + date.getMinutes().toString().padStart(2, "0"))
    
    const [playersLoaded, setPlayersLoaded] = useState(false);

    const getAllPlayers = () => {
        Api.get('/actors/fighters' // TODO type proper url when backend is ready
        ).then(res => {
            setPlayers(res.data)
            console.log(res.data)
            setPlayersLoaded(true);
        }).catch(e => {
            console.log(e) // TODO handle it somehow
        })
    }

    useEffect(() => {
        getAllPlayers()  
    }, [])

    const showMode = (mode) => {
        setShow(true)
        setMode(mode)
    }

    const onChange = (event, selectedDate) => {
        const currDate = selectedDate || date
        setShow(Platform.OS === "ios")
        setDate(currDate)
        setDateString(selectedDate.getDate() + "-" + selectedDate.getMonth() + "-" + selectedDate.getFullYear()) // example date format
        setTimeString(selectedDate.getHours() + ":" + selectedDate.getMinutes().toString().padStart(2, "0"))
    }

    const onCreateClick = () => {
        console.log({
            firstPlayer: firstPlayer,
            secondPlayer: secondPlayer,
            date: dateString,
            time: timeString
        })
        Api.post("/matches/new-match", { // temporary request body
            firstPlayer: firstPlayer,
            secondPlayer: secondPlayer,
            date: dateString,
            time: timeString
          }).then(res => {
              console.log(res)
          }).catch(e => {
              console.log(e)
        })
    }

    return (
        playersLoaded && <>
            <FormHeaderLink pathname="MatchList" state={{}} name="Create fight"> </FormHeaderLink>
            <Center>
                <Text marginBottom="20px" color="black" fontSize="18" fontWeight="bold">
                    Choose fighters
                </Text>
                <VStack width="90%" mx="3" maxW="300px">
                    <FormControl>
                        <SearchableDropdown
                            onItemSelect={(item) => {
                                console.log(item)
                                setFirstPlayer(item)
                                console.log(firstPlayer)
                                setShowSearch1(false)
                                console.log(item)
                            }}
                            itemStyle={{
                                padding: 10,
                                marginTop: 2,
                                backgroundColor: '#ddd',
                                borderColor: '#bbb',
                                borderWidth: 1,
                                borderRadius: 5,
                            }}
                            itemTextStyle={{ color: '#222' }}
                            itemsContainerStyle={{ maxHeight: 140 }}
                            items={players}
                            resetValue={false}
                            defaultIndex={2}
                            placeholder={showSearch1 ? "Search" : firstPlayer.name}
                            textInputProps={
                                {
                                    underlineColorAndroid: "transparent",
                                    style: {
                                        padding: 10,
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        borderRadius: 5,
                                    },
                                }
                            }
                            listProps={
                                {
                                    nestedScrollEnabled: true,
                                }
                            }
                            value={firstPlayer}
                        />
                        <Center>
                            <Text color="black" fontSize="16" padding="5px" fontWeight="bold">
                                vs.
                            </Text>
                        </Center>
                        <SearchableDropdown
                            onItemSelect={(player) => {
                                setSecondPlayer(player)
                                setShowSearch2(false)
                            }}
                            itemStyle={{
                                padding: 10,
                                marginTop: 2,
                                backgroundColor: '#ddd',
                                borderColor: '#bbb',
                                borderWidth: 1,
                                borderRadius: 5,
                            }}
                            itemTextStyle={{ color: '#222' }}
                            itemsContainerStyle={{ maxHeight: 140 }}
                            items={players}
                            resetValue={false}
                            placeholder={showSearch2 ? "Search" : secondPlayer.name}
                            textInputProps={
                                {
                                    underlineColorAndroid: "transparent",
                                    style: {
                                        padding: 10,
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        borderRadius: 5,
                                    },
                                }
                            }
                            listProps={
                                {
                                    nestedScrollEnabled: true,
                                }
                            }
                        />
                        <Center marginTop="30px">
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
                            <Flex direction="row" marginTop="30px">
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
                            <Text marginTop="30px" marginRight="30px">Date: {dateString}  Time: {timeString}</Text>
                            <Button onPress={onCreateClick}
                                marginTop="30px"
                                size="lg"
                                marginRight="30px"
                                bg="#059669" _text={{
                                        color: "white"
                                    }}>
                                Create
                            </Button>
                        </Center>
                    </FormControl>
                </VStack>
            </Center>
            {show && (
                <DateTimePicker
                    value={date}
                    testID="dateTimePicker"
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}>
                </DateTimePicker>
            )}
        </>
    );
};

export default CreateMatchForm;