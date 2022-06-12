import { StyleSheet } from 'react-native-web';
import { NativeBaseProvider } from 'native-base';
import CreateMatchForm from './components/match/CreateMatchForm';
import { SSRProvider } from 'react-bootstrap';
import React from 'react';
import { NativeRouter, Route, Routes } from 'react-router-native';
import FightInfo from './components/fight/FightInfo';
import RegisterPlayerForm from './components/fighter/RegisterPlayerForm';
import TokenInput from './components/TokenInput';
import LoginPick from './components/LoginPick';
import DisplayMatch from './components/match/DisplayMatch';
import FightHistory from './components/fight/FightHistory';
import FightStats from './components/fight/FightStats';
import MatchList from './components/match/MatchList';
import CancelFightConfirmation from './components/fight/CancelFightConfirmation';
import FighterList from './components/fighter/FighterList';
import TournamentList from './components/tournaments/TournamentList';
import FightResult from './components/fight/FightResult';
import SuggestPoints from './components/SuggestPoints';
import FighterInfo from './components/fighter/FighterInfo';
import DeleteFighterConfirmation from './components/fighter/DeleteFighterConfirmation';
import TournamentInfo from './components/tournaments/TournamentInfo';
import TournamentResult from './components/TournamentResult';
import CancelTournamentConfirmation from './components/tournaments/CancelTournamentConfirmation';
import CreateTournamentForm from "./components/tournaments/CreateTournamentForm";

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
                        <Route path="/tournamentInfo" element={<TournamentInfo />} />
                        <Route path="/tournamentResult" element={<TournamentResult />} />
                        <Route path="/cancelTournament" element={<CancelTournamentConfirmation />} />
                        <Route path="/createTournamentForm" element={<CreateTournamentForm />} />
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
