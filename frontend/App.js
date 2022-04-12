import { StyleSheet } from 'react-native-web';
import { NativeBaseProvider } from 'native-base';
import RegisterPlayerForm from './components/RegisterPlayerForm';

export default function App() {
  return (
      <NativeBaseProvider>
          <RegisterPlayerForm/>
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
