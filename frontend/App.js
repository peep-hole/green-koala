import {StyleSheet} from 'react-native-web';
import {NativeBaseProvider} from 'native-base';
import CreateMatchForm from "./components/CreateMatchForm";
import {SSRProvider} from "react-bootstrap";
import React from "react";
import FightInfo from './components/FightInfo';

export default function App() {
  return (
      <NativeBaseProvider>
          <SSRProvider>
              <FightInfo fightId="1234" > </FightInfo>
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
