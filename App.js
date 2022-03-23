import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import { useEffect } from 'react';

export default function App() {

useEffect(()=>{
  axios.post("/api/user").then((res)=>console.log(res))
  console.log('hola 123')
}, [])

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
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
