import {StyleSheet} from 'react-native-web';
import React from 'react';
import Test from './components/Test'

export default function App() {
  
  return (
      <Test />
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
