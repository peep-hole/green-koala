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
import SuggestPoints from './components/SuggestPoints';

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
                        <Route path="/fightInfo" element={<FightInfo />} />
                        <Route path="/displayMatch" element={<DisplayMatch />} />
                        <Route path="/createMatchForm" element={<CreateMatchForm />} />
                        <Route
                            path="/suggestPoints"
                            element={
                                <SuggestPoints
                                    fighter={0}
                                    fighterName="Fighter One"
                                    matchId=""
                                    isMainReferee={true}
                                    token="d445a1df-f492-4239-86c0-abb6185ce543"
                                    points1={0}
                                    points2={3}
                                />
                            }
                        />
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
