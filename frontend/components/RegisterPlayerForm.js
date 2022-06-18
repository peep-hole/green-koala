import React from "react";
import { Text } from "react-native";
import FormHeaderLink from "./util/FormHeaderLink";
import { NativeBaseProvider, VStack, Input, Button, Radio, Switch, InputGroup, Center } from "native-base";
import Api from "./util/Api";
import { Navigate } from "react-router-native";

const RegisterPlayerForm = () => {
    const submitColor = "tertiary.600";
    const colorScheme = "tertiary";
    const padding = "10px";
    const optionsSpacing = "20px";
    const verticalPadding = "10px";
    const horizontalPadding = "30px";
    const marginTop = "30px";
    const errorColor = "#b91c1c"; /// error.700 in native base

    const [gender, setGender] = React.useState('male'); /// occurs a bug when was in object, planned to append on submit
    const [formData, setData] = React.useState({
        name: '',
        surname: '',
        age: '',
        weight: '',
        // option1: '',
        // option2: '',
        // option3: ''
    });
    const [error, setError] = React.useState('');
    const [playerAdded, setPlayerAdded] = React.useState(false);

    const validate = () => {        /// form logic
        for (const property in formData) {    /// required fields
            if (formData[property] === '') {
                setError(property.toString() + ' is required');
                return false;
            }
        }
        const nameRegex = /^[A-Z][a-z]*$/;       /// age must be int
        if (!nameRegex.test(formData.name)) {
            setError("name can contains only letters");
            return false;
        }
        if (!nameRegex.test(formData.surname)) {
            setError("surname can contains only letters");
            return false;
        }
        const intRegex = /^\d+$/;       /// age must be int
        if (!intRegex.test(formData.age)) {
            setError("age must be a number");
            return false;
        }
        if (!intRegex.test(formData.weight)) {
            setError("weight must be a number");
            return false;
        }
        if(!parseInt(formData.age)){
            setError("age should be positive number");
            return false;
        }
        if(!parseInt(formData.weight)){
            setError("weight should be positive number");
            return false;
        }

        setError(''); // everything is ok
        return true;
    };

    const onSubmit = () => {
        if (validate()) {
            Api.post("/actors/register-fighter", {
                // player_data: {...formData, gender: gender}
                name: formData.name,
                surname: formData.surname,
                age: formData.age,
                weight: formData.weight
            })
                .then(() => {
                    console.log("Player added")
                    setPlayerAdded(true);
                })
                .catch(e => {
                    console.log(e)
                });
        }
    };

    return (
        <NativeBaseProvider>
            <FormHeaderLink pathname="fighterList" name="New fighter" />
            {/* radio group in separate component? */}
            <Radio.Group
                name="playerGender"
                accessibilityLabel="player gender"
                value={gender}
                onChange={value => { setGender(value) }}
                flexDirection="row"
                justifyContent="space-between"
                px={horizontalPadding}
                py={verticalPadding}
            >
                <Radio value="male" size="sm" colorScheme={colorScheme}>
                    Male
                </Radio>
                <Radio value="female" size="sm" colorScheme={colorScheme}>
                    Female
                </Radio>
            </Radio.Group>
            <VStack space={padding} w="100%" px={horizontalPadding} py={verticalPadding}>
                <Input padding={padding} placeholder="Name" onChangeText={value => { setData({ ...formData, name: value }) }} />
                <Input padding={padding} placeholder="Surname" onChangeText={value => { setData({ ...formData, surname: value }) }} />
                <Input padding={padding} placeholder="Age" onChangeText={value => { setData({ ...formData, age: value }) }} />
                <InputGroup padding={padding}>
                    <Input flexGrow="1" placeholder="Weight" onChangeText={value => { setData({ ...formData, weight: value }) }} />
                </InputGroup>
            </VStack>
            <VStack space={optionsSpacing} w="100%" marginTop={marginTop}>
                {/* maybe new component for every switch with props is better idea?, but what with passing object? */}
                <Center display="flex" flexDirection="row" alignItems="center">
                    <Switch
                        colorScheme={colorScheme}
                        isChecked={formData.option1}
                        onToggle={() => { setData({ ...formData, option1: !formData.option1 }) }} />
                    <Text> Can fight with weapon: </Text>
                </Center>
                <Center display="flex" flexDirection="row" alignItems="center">
                    <Switch
                        colorScheme={colorScheme}
                        isChecked={formData.option2}
                        onToggle={() => { setData({ ...formData, option2: !formData.option2 }) }} />
                    <Text> Can fight on fists: </Text>
                </Center>
                <Center display="flex" flexDirection="row" alignItems="center">
                    <Switch
                        colorScheme={colorScheme}
                        isChecked={formData.option3}
                        onToggle={() => { setData({ ...formData, option3: !formData.option3 }) }} />
                    <Text> Is popular: </Text>
                </Center>
            </VStack>
            <Center padding={padding} marginTop={marginTop}>
                <Button
                    onPress={onSubmit}
                    backgroundColor={submitColor}>
                    Add
                </Button>
            </Center>
            <Center px={horizontalPadding} py={verticalPadding}>
                <Text style={{ color: errorColor, fontWeight: "600" }}>{error}</Text>
            </Center>
            {playerAdded && <Navigate to="/fighterList"></Navigate>}
        </NativeBaseProvider>
    )
}

export default RegisterPlayerForm;