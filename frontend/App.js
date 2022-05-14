import { StyleSheet } from 'react-native-web';
import { NativeBaseProvider } from 'native-base';
import CreateMatchForm from './components/CreateMatchForm';
import { SSRProvider } from 'react-bootstrap';
import React from 'react';
import { NativeRouter, Route, Routes } from 'react-router-native';
import FightInfo from './components/FightInfo';
import Timer from './components/Timer';
import FormHeader from './components/util/FormHeader';
import RegisterPlayerForm from './components/RegisterPlayerForm';
import Demo from './components/Demo';
import TokenInput from './components/TokenInput';
import LoginPick from './components/LoginPick';
import DisplayScore from './components/DisplayScore';
import DisplayMatch from './components/DisplayMatch';

export default function App() {
    return (
        <NativeBaseProvider>
            <SSRProvider>
                <NativeRouter>
                    <Routes>
                        <Route path="/" element={<Demo />} />
                        <Route path="/tokenInput" element={<TokenInput />} />
                        <Route path="/registerPlayerForm" element={<RegisterPlayerForm />} />
                        <Route path="/loginPick" element={<LoginPick />} />
                        <Route
                            path="/fightInfo"
                            element={
                                <FightInfo fightId="ea5d74b4-c70b-11ec-9d64-0242ac120002" />
                            }
                        />
                        <Route path="/displayMatch" element={<DisplayMatch fightId="ea5d74b4-c70b-11ec-9d64-0242ac120002" />} />
                        <Route path="/createMatchForm" element={<CreateMatchForm />} />
                    </Routes>
                </NativeRouter>
            </SSRProvider>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
