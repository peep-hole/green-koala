import {StyleSheet} from 'react-native-web';
import {NativeBaseProvider} from 'native-base';
import CreateMatchForm from "./components/CreateMatchForm";
import {SSRProvider} from "react-bootstrap";
import React from "react";
import Timer from "./components/Timer";
import FormHeader from "./components/util/FormHeader";
import RegisterPlayerForm from "./components/RegisterPlayerForm";

export default function App() {
  return (
      <NativeBaseProvider>
          <SSRProvider>
              <Timer> </Timer>
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
