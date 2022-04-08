import { Button } from 'react-bootstrap';
import { StyleSheet, Text, View } from 'react-native';

const LoginPick = () => {
    return(
        <>
            <Text style={{textAlign: "center"}}>Login Screen</Text>
            <Text style={{textAlign: "center"}}>Dołącz jako</Text>
            <View style={rolePickContainer}>
                <Button style={rolePickStyle}>Sędzia główny</Button>
                <Button style={rolePickStyle}>Sędzia boczny</Button>
                <Button style={rolePickStyle}>Organizator</Button>
            </View>
            
            
            <Button style={{bottom: 0, margin: 20}}>Info</Button> 
        </>
        
    )
}

const rolePickContainer = {display: "flex", justifyContent: "spaceBetween", flexDirection: "column", flexWrap: "nowrap"}
const rolePickStyle = {padding: 50, margin: 20}

export default LoginPick