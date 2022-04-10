import { StyleSheet } from 'react-native-web';
import FormHeader from "./components/util/FormHeader";
import { NativeBaseProvider } from 'native-base';

export default function App() {
  return (
      <NativeBaseProvider>
          <FormHeader name="Title"> </FormHeader>
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
