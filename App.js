
import axios from "axios";
import { useEffect, useState } from "react";
import Constants from "expo-constants";
/* const { manifest } = Constants; */
import { View, Text, SafeAreaView } from 'react-native'
import * as React from 'react';
import WelcomeNavigation from './src/navigations/WelcomeNavigation';
import RootNavigation from "./src/navigation/rootNavigation";


function App() {
  return (
    <SafeAreaView style={{flex : 1}}>
      <RootNavigation/>
    </SafeAreaView>
  );
}

export default App;




/*import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {

  const [name, setName] = useState("")

  const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
  ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
  : `api.example.com`;

  useEffect(async() => {
    try {
      // console.log(localhost.name)
      const res = await axios.post(`http://${api}/api/user/prueba`, {"name": "amazing"})
      setName(res.data.name)
    }
    catch(err) {
      console.error(err)
    }
  }, []);
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your {name} app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});*/
