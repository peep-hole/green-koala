import React from "react";
import { View, Text } from "react-native-web";
import FormHeader from "./util/FormHeader";
import { Input, Button, VStack, NativeBaseProvider, Radio, Switch, Center } from "native-base";

const RegisterPlayerForm = () =>{
    const onTrackColor = "tertiary.100";
    const buttonColor = "tertiary.400";
    const padding = "10px";
    const margin = "30px 0";

    const [gender, setGender] = React.useState('male'); /// occurs a bug when was in object, planned to append on submit
    const [formData, setData] = React.useState({
        name: '',
        surname: '',
        age: '',
        weight: '',
        option1: false,
        option2: false,
        option3: false
    });

    const onSubmit = () => {
        console.log({...formData, gender: gender});
    };

    return(
        <NativeBaseProvider> 
            <FormHeader name="New Fighter"/>
            {/* radio group in separate component? */}
            <Radio.Group    
            name="playerGender"
            accessibilityLabel="player gender"
            value={gender}
            onChange={value => {setGender(value)}}
            flexDirection="row"
            justifyContent="space-around"
            padding={padding}
            >
                <Radio value="male">
                    Male
                </Radio>
                <Radio value="female">
                    Female
                </Radio>
            </Radio.Group>
            <VStack space={padding} w="100%" padding={padding}>
                <Input placeholder="Name" onChangeText={value => {setData({...formData, name: value})}} />
                <Input placeholder="Surname" onChangeText={value => {setData({...formData, surname: value})}} />
                <Input placeholder="Age" onChangeText={value => {setData({...formData, age: value})}} />
                <Input placeholder="Weight" onChangeText={value => {setData({...formData, weight: value})}} />
            </VStack>
            <VStack space={padding} w="100%" padding={padding}>
                {/* maybe new component with props is better idea? */}
                <Center display="flex" flexDirection="row" alignItems="center" gap={padding}>
                    <Switch 
                    onTrackColor={onTrackColor} 
                    onThumbColor={buttonColor} 
                    isChecked={formData.option1} 
                    onToggle={() => {setData({...formData, option1: !formData.option1})}} />
                    <Text> Option1 </Text>
                </Center>
                <Center display="flex" flexDirection="row" alignItems="center" gap={padding}>
                    <Switch 
                    onTrackColor={onTrackColor} 
                    onThumbColor={buttonColor} 
                    isChecked={formData.option2} 
                    onToggle={() => {setData({...formData, option2: !formData.option2})}} />
                    <Text> Option2 </Text>
                </Center>
                <Center display="flex" flexDirection="row" alignItems="center" gap={padding}>
                    <Switch 
                    onTrackColor={onTrackColor} 
                    onThumbColor={buttonColor} 
                    isChecked={formData.option3}  
                    onToggle={() => {setData({...formData, option3: !formData.option3})}} />
                    <Text> Option3 </Text>
                </Center> 
            </VStack>
            <Center margin={margin}>
                <Button 
                onPress={onSubmit} 
                width="33%" 
                backgroundColor={buttonColor}>
                    Submit
                </Button>
            </Center>
        </NativeBaseProvider>
    )
}

export default RegisterPlayerForm;