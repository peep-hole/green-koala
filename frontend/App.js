import { StyleSheet } from 'react-native-web';
import { NativeBaseProvider } from 'native-base';
import CreateMatchForm from './components/CreateMatchForm';
import { SSRProvider } from 'react-bootstrap';
import React from 'react';
import { NativeRouter, Route, Routes } from 'react-router-native';
import FightInfo from './components/FightInfo';
import RegisterPlayerForm from './components/RegisterPlayerForm';
import Demo from './components/Demo';
import TokenInput from './components/TokenInput';
import LoginPick from './components/LoginPick';
import DisplayMatch from './components/DisplayMatch';
import FightHistory from './components/FightHistory';
import FightStats from './components/FightStats';
import MatchList from './components/MatchList';
import CancelFightConfirmation from './components/CancelFightConfirmation';
import FighterList from './components/FighterList';
import TournamentList from './components/TournamentList';
import FightResult from './components/FightResult';
import SuggestPoints from './components/SuggestPoints';
import FighterInfo from './components/FighterInfo';
import DeleteFighterConfirmation from './components/DeleteFighterConfirmation';

export default function App() {
    return (
        <NativeBaseProvider>
            <SSRProvider>
                <NativeRouter>
                    <Routes>
                        <Route path="/" element={<LoginPick />} />
                        <Route path="/tokenInput" element={<TokenInput />} />
                        <Route path="/registerPlayerForm" element={<RegisterPlayerForm />} />
                        <Route path="/loginPick" element={<LoginPick />} />
                        <Route path="/fightInfo" element={<FightInfo />} />
                        <Route path="/fightResult" element={<FightResult />} />
                        <Route path="/displayMatch" element={<DisplayMatch />} />
                        <Route path="/createMatchForm" element={<CreateMatchForm />} />
                        <Route path="/fightHistory" element={<FightHistory />} />
                        <Route path="/fightStats" element={<FightStats />} />
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
                        <Route path="/cancelMatch" element={<CancelFightConfirmation />} />
                        <Route path="/matchList" element={<MatchList />} />
                        <Route path="/fighterList" element={<FighterList />} />
                        <Route path="/tournamentList" element={<TournamentList />} />
                        <Route path="/fighterInfo" element={<FighterInfo />} />
                        <Route path="/deleteFighter" element={<DeleteFighterConfirmation />} />
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
