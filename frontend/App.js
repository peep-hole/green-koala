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
import FightHistory from './components/FightHistory';
import FightStats from './components/FightStats';
import MatchList from './components/MatchList';
import CancelFightConfirmation from './components/CancelFightConfirmation';
import FighterList from './components/FighterList';
import TournamentList from './components/TournamentList';
import FightResult from './components/FightResult';

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
                        <Route path="/fightResult" element={<FightResult />} />
                        <Route path="/displayMatch" element={<DisplayMatch />} />
                        <Route path="/createMatchForm" element={<CreateMatchForm />} />
                        <Route path="/fightHistory" element={<FightHistory />} />
                        <Route path="/fightStats" element={<FightStats />} />
                        <Route path="/cancelMatch" element={<CancelFightConfirmation />} />
                        <Route path="/matchList" element={<MatchList />} />
                        <Route path="/fighterList" element={<FighterList />} />
                        <Route path="/tournamentList" element={<TournamentList />} />
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
