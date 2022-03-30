import React, { useEffect, useState } from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { styles } from "../styles/Styles";

import Register from "./Register";
import Login from "./Login";

import Constants from "expo-constants";

const { manifest } = Constants;

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

function Welcome({ navigation }) {
  const [user, setUser] = useState({});

  // useEffect(async () => {
  //   try {
  //     const userString = await AsyncStorage.getItem("userInfo");
  //     if (userString) {
  //       console.log(`user string es`, userString);
  //       const userObject = JSON.parse(userString);
  //       setUser(userObject);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  const handleLogOut = async () => {
    try {
      const result = await axios.post(`${uri}/api/user/logout`)
      const emptyUser = result.data
      setUser(emptyUser)
      console.log('empty user es', emptyUser)
    } catch (err) {
      console.log(err);
    }

  }

  return (
    <View style={styles.fondo}>
      {user["name"] ? (
        <>
          <Text style={styles.info}>Bienvenido, {user.name}</Text>

          <TouchableOpacity
            style={styles.colorBtn}
            onPress={handleLogOut}
          >
            <Text style={styles.colorTxtBtn}>Log Out</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.info}>Bienvenido, registrate o logeate</Text>

          <TouchableOpacity
            style={styles.colorBtn}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.colorTxtBtn}>Iniciar Sesion</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.colorBtn}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.colorTxtBtn}>Registrarse</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export default Welcome;
