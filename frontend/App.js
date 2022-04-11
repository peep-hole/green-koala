import { StyleSheet } from 'react-native-web';
import { NativeBaseProvider } from 'native-base';
import FormHeader from "./components/util/FormHeader";

export default function App() {
  return (
      <NativeBaseProvider>
          <FormHeader> </FormHeader>
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
