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

import Home from "./Home"

function Login({ navigation }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigation.navigate('Home')
  };

  return (
    <SafeAreaView>
      <View>
        <TextInput
          onChange={handleChange}
          type="text"
          placeholder="Email"
          name="email"
        />
      </View>

      <View className="field">
        <TextInput
          onChange={handleChange}
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
