import React, { useEffect, useState } from "react";
import { Button, View, Text, StyleSheet, TouchableOpacity } from "react-native";

/* import { styles } from "../styles/Styles"; */

import Register from "./Register";
import Login from "./Login";

const welcome = StyleSheet.create({
  container: {
    backgroundColor: "#0e0b29",
    flex: 1,
    justifyContent: "space-evenly",
  },
  info: {
    marginTop: 50,
    color: "white",
    fontSize: 50,
    textAlign: "center",
  },
  colorBtn: {
    borderWidth: 1,
    borderColor: "#f27e18",
    backgroundColor: "#e69249",
    padding: 15,
    marginTop: 20,
    marginRight: 20,
    borderRadius: 7,
  },
  colorTxtBtn: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center",
  },
  btnContainer: {
    backgroundColor: "#0e0b29",
    alignSelf: "center",
    marginBottom: "20%",
    width: "50%",
  },
});

function Welcome({ navigation }) {
  return (
    <View style={welcome.container}>
      <Text style={welcome.info}>Bienvenido a Match Maker</Text>

      <View style={welcome.btnContainer}>
        <TouchableOpacity
          style={welcome.colorBtn}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={welcome.colorTxtBtn}>Iniciar Sesion</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={welcome.colorBtn}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={welcome.colorTxtBtn}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Welcome;
