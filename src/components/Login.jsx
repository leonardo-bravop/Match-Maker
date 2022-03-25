import React from "react";

import {
  Button,
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,

} from "react-native";

import { useEffect, useState } from "react";
import axios from "axios";

import Constants from "expo-constants";

const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;

import Home from "./Home"

function Login({ navigation }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  onChangeText = (key, val) => {
    setForm({...form, [key]: val })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const user = await axios.post(`${uri}/api/user/login`, form)

      user.status == 201 ?  navigation.navigate('Home') : null
  } catch (err) {
    console.log(err)
  }
}

  return (
    <SafeAreaView>
      <View>
        <TextInput
          onChangeText={val => onChangeText('email', val)}
          type="text"
          placeholder="Email"
          name="email"
        />
      </View>

      <View className="field">
        <TextInput
           onChangeText={val => onChangeText('password', val)}
          type="password"
          placeholder="Password"
          name="password"
        />

        <View>
          <Button
            className="button is-primary is-inverted is-small px-0"
            title="¿Ha olvidado su contraseña?"
            type="button"
          />
        </View>
      </View>

      <View className="buttons is-centered">
        <Button type="submit" name="Iniciar sesion" title="Iniciar sesion" onPress={handleSubmit} style={{marginTop: 10}}/>
      </View>
    </SafeAreaView>
  );
}

export default Login;
