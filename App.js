import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { useEffect, useState } from "react";
import Constants from "expo-constants";
const { manifest } = Constants;

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
});
