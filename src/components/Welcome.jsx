import React from "react";
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from "react-native";

import { styles } from "../styles/Styles";

import Register from "./Register";
import Login from "./Login";

function Welcome({ navigation }) {

    return (
      <View style={styles.fondo}>
        
        <Text style={styles.info} >Bienvenido, registrate o logeate</Text>
        
        <TouchableOpacity
          style={styles.colorBtn}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.colorTxtBtn}>Iniciar Sesion</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.colorBtn}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.colorTxtBtn}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    );
  }

export default Welcome