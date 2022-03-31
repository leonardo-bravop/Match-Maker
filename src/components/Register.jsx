import React from "react";
import {
  Button,
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { form } from "../styles/form";

import { useEffect, useState } from "react";
import axios from "axios";

import Constants from "expo-constants";

const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

function Register({ navigation }) {
  const handleRegister = (values) => {
    axios.post(`${uri}/api/user/register`, values).then((res) => {
      res.status == 201 ? navigation.navigate("Login") : null;
    });
  };

  const validationSchema = yup.object().shape({
    name: yup
      .string("Ingresa tu nombre")
      .required("*Campo requerido")
      .max(10, "La contraseña debe tener un maximo de 10 caracteres"),

    surname: yup.string("Ingresa tu apellido").required("*Campo requerido"),

    nickname: yup.string("Ingresa tu nickname").required("*Campo requerido"),

    email: yup
      .string("Ingresa tu email")
      .required("*Campo requerido")
      .email("Ingresa un Email válido"),

    password: yup
      .string("Ingresa tu eontraseña")
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .required("*Campo requerido").matches(/^(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,}).{8,}$/, "La contraseña debe tener al menos una mayúscula"),
  });

  return (
    <SafeAreaView style={form.container}>
      <Formik
        validateOnMount={true}
        validationSchema={validationSchema}
        initialValues={{
          name: "",
          surname: "",
          email: "",
          password: "",
          nickname: "",
          age: "26",
        }}
        onSubmit={(values) => handleRegister(values)}
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
            <Text style={form.formTittle}>Inicia Sesión</Text>

            <View style={form.inputContainer}>
              <TextInput
                style={form.inputs}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                keyboardType="default"
                placeholder="Nombre"
                name="name"
              />

              {errors.name && touched.name && <Text>{errors.name}</Text>}

              <TextInput
                style={form.inputs}
                onChangeText={handleChange("surname")}
                onBlur={handleBlur("surname")}
                value={values.surname}
                keyboardType="default"
                placeholder="Apellido"
                name="surname"
              />

              <TextInput
                style={form.inputs}
                onChangeText={handleChange("nickname")}
                onBlur={handleBlur("nickname")}
                value={values.nickname}
                keyboardType="default"
                placeholder="Nickname"
                name="nickname"
              />

              {errors.surname && touched.surname && (
                <Text>{errors.surname}</Text>
              )}

              <TextInput
                style={form.inputs}
                placeholder="Email"
                name="email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />

              {errors.email && touched.email && <Text>{errors.email}</Text>}

              <TextInput
                style={form.inputs}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                keyboardType="default"
                secureTextEntry={true}
                placeholder="Password"
                name="password"
              />

              {errors.password && touched.password && (
                <Text>{errors.password}</Text>
              )}
            </View>

            <TouchableOpacity style={form.colorBtn} onPress={handleSubmit}>
              <Text style={form.colorTxtBtn}>Registrarse</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
      <Text
        style={form.colorTxtBtn}
        onPress={() => navigation.navigate("Login")}
      >
        Login
      </Text>
      <Text
        style={form.colorTxtBtn}
        onPress={() => navigation.navigate("Welcome")}
      >
        welcome
      </Text>
    </SafeAreaView>
  );
}

export default Register;
