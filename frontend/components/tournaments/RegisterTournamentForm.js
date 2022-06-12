import React, {useState} from 'react';
import Api from "../util/Api";
import {Button, Center, Flex, Input, InputGroup, NativeBaseProvider, Radio, Switch, VStack} from "native-base";
import FormHeaderLink from "../util/FormHeaderLink";
import {Platform, Text} from "react-native";
import {Navigate, useNavigate} from "react-router-native";
import {FontAwesome} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const RegisterTournamentForm = () => {
    const submitColor = "tertiary.600"
    const padding = "10px"
    const verticalPadding = "10px"
    const horizontalPadding = "30px"
    const marginTop = "30px"
    const errorColor = "#b91c1c"
    const navigate = useNavigate()

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

    const addPlayer = () => {
        navigate('/selectPlayers')
    }

    const showMode = (mode) => {
        setShow(true)
        setMode(mode)
    }

    return (
        <NativeBaseProvider>
            <FormHeaderLink pathname="fighterList" name="New fighter" />
            <VStack space={padding} w="100%" px={horizontalPadding} py={verticalPadding}>
                <Input padding={padding} placeholder="Name" onChangeText={value => { setData({ ...formData, name: value }) }} />
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
            </VStack>
            <Center padding={padding} marginTop={marginTop}>
                <Button
                    onPress={addPlayer}
                    backgroundColor={submitColor}>
                    Add player
                </Button>
            </Center>
            <Center padding={padding} marginTop={marginTop}>
                <Button
                    onPress={onSubmit}
                    backgroundColor={submitColor}>
                    Submit
                </Button>
            </Center>
            <Center px={horizontalPadding} py={verticalPadding}>
                <Text style={{ color: errorColor, fontWeight: "600" }}>{error}</Text>
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
            )}
        </NativeBaseProvider>
    )
};

export default RegisterTournamentForm;