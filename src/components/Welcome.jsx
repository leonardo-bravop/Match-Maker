import React from "react";
import {
  Button,
  View,
  Text,
} from "react-native";

import { styles } from "../styles/Styles";

import Register from "./Register";
import Login from "./Login";

function Welcome({ navigation }) {
    return (
      <View style={styles.fondo}>
        <Text>Bienvenido, registrate o logeate</Text>
            <Button
            title="Register"
            onPress={() => navigation.navigate('Register')}
            />
          <Button
          title="Login"
          onPress={() => navigation.navigate('Login')}
          />
        </View>
    );
  }

export default Welcome