import React from "react";
import { Text } from "react-native";
import FormHeader from "./util/FormHeader";
import { NativeBaseProvider, VStack, Input, Button,  Radio, Switch, InputGroup, InputRightAddon, Center } from "native-base";
import Api from "./util/Api";

const RegisterPlayerForm = () =>{
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
        weight: ''
    });

    const [error, setError] = React.useState('');

    const validate = () => {        /// form logic
        for(const property in formData){    /// required fields
            if(formData[property] === ''){
                setError(property.toString() + ' is required');
                return false;
            }
        }
        const intRegex = /^\d+$/;       /// age must be int
        if (!intRegex.test(formData.age)) {
            setError("age must be a number");
            return false;
        }
        const floatRegex = /^\d+(\.\d+)?$/; /// weight must be float
        if (!floatRegex.test(formData.weight)) {
            setError("weight must be in a format: number(.number)");
            return false;
        }
        
        setError(''); // everything is ok
        return true;
    };

    const onSubmit = () => {
        if(validate()){
            Api.post("/actors/register-fighter", {
                player_data: {...formData, gender: gender}
            })
            .then(response => console.log(response.data))
            .catch(e => {
                console.log(e)
          });
        }
    };

    return(
        <NativeBaseProvider>
            <FormHeader name="New fighter"/>
            {/* radio group in separate component? */}
            <Radio.Group    
            name="playerGender"
            accessibilityLabel="player gender"
            value={gender}
            onChange={value => {setGender(value)}}
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
                <Input padding={padding} placeholder="Name" onChangeText={value => {setData({...formData, name: value})}} />
                <Input padding={padding} placeholder="Surname" onChangeText={value => {setData({...formData, surname: value})}} />
                <Input padding={padding} placeholder="Age" onChangeText={value => {setData({...formData, age: value})}} />
                <InputGroup padding={padding}>
                    <Input flexGrow="1" placeholder="Weight" onChangeText={value => {setData({...formData, weight: value})}} />
                    <InputRightAddon children={"kg"} />
                </InputGroup>
            </VStack>
            {/*<VStack space={optionsSpacing} w="100%" marginTop={marginTop}>*/}
            {/*    /!* maybe new component for every switch with props is better idea?, but what with passing object? *!/*/}
            {/*    <Center display="flex" flexDirection="row" alignItems="center">*/}
            {/*        <Switch */}
            {/*        colorScheme={colorScheme}*/}
            {/*        isChecked={formData.option1} */}
            {/*        onToggle={() => {setData({...formData, option1: !formData.option1})}} />*/}
            {/*        <Text> Option1 </Text>*/}
            {/*    </Center>*/}
            {/*    <Center display="flex" flexDirection="row" alignItems="center">*/}
            {/*        <Switch */}
            {/*        colorScheme={colorScheme}*/}
            {/*        isChecked={formData.option2} */}
            {/*        onToggle={() => {setData({...formData, option2: !formData.option2})}} />*/}
            {/*        <Text> Option2 </Text>*/}
            {/*    </Center>*/}
            {/*    <Center display="flex" flexDirection="row" alignItems="center">*/}
            {/*        <Switch */}
            {/*        colorScheme={colorScheme}*/}
            {/*        isChecked={formData.option3}  */}
            {/*        onToggle={() => {setData({...formData, option3: !formData.option3})}} />*/}
            {/*        <Text> Option3 </Text>*/}
            {/*    </Center> */}
            {/*</VStack>*/}
            <Center padding={padding} marginTop={marginTop}>
                <Button 
                onPress={onSubmit} 
                backgroundColor={submitColor}>
                    Add
                </Button>
            </Center>
            <Center px={horizontalPadding} py={verticalPadding}>
            <Text style={{color: errorColor, fontWeight: "600"}}>{error}</Text>
            </Center>
        </NativeBaseProvider>
    )
}

export default RegisterPlayerForm;