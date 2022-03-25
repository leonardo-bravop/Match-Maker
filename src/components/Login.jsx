import React from "react";

import {
  Button,
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./Home";
import { Formik } from "formik";
import * as yup from "yup";
import { styles } from "../styles/Styles";
import Constants from "expo-constants";

const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

function Login({ navigation }) {
  const handleLogin = async (values) => {
    try {
      const user = await axios.post(`${uri}/api/user/login`, values);

      user.status == 201 ? navigation.navigate("Home") : null;
    } catch (err) {
      console.log(err);
    }
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string("Ingresa tu Email")
      .required("*Campo requerido")
      .email("Ingresa un Email válido"),

    password: yup
      .string("Ingresa tu Contraseña")
      .min(3, "La contraseña debe tener al menos 3 caracteres")
      .required("*Campo requerido"),
  });

  return (
    <SafeAreaView>
      <View>
        <Formik
          validateOnMount={true}
          validationSchema={validationSchema}
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => handleLogin(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <>
              <TextInput
                style={styles.inputs}
                placeholder="Email"
                name="email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />

              {errors.email && touched.email && <Text>{errors.email}</Text>}

              <TextInput
                style={styles.inputs}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry={true}
                placeholder="Password"
                name="password"
              />
              {errors.password && touched.password && (
                <Text>{errors.password}</Text>
              )}

              <TouchableOpacity style={styles.colorBtn} onPress={handleSubmit}>
                <Text style={styles.colorTxtBtn}>Aceptar</Text>
              </TouchableOpacity>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
}

export default Login;
