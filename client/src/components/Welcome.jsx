import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import * as yup from "yup";
import { form } from "../styles/form";
import { welcome } from "../styles/welcome";
import { useDispatch } from "react-redux";
import { setUserMe } from "../state/user";
import axios from "axios";
import Constants from "expo-constants";

function Welcome({ navigation }) {
  const dispatch = useDispatch();
  const [userString, setUserString] = useState("");
  const [errorMessage, setErrorMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { manifest } = Constants;
  const uri = `http://${manifest.debuggerHost.split(":").shift()}:3000`;

  useEffect(() => {
    const asyncUser = async () => {
      const result = await AsyncStorage.getItem("userInfo");
      setUserString(result);
      if (result) {
        await dispatch(setUserMe(userString));
        navigation.navigate("Home");
        return;
      }
      await dispatch(setUserMe(userString));
    };
    asyncUser();
  }, []);

  //Login Form utils
  const handleLogin = async (values) => {
    try {
      setIsLoading(true);
      const result = await axios.post(`${uri}/api/user/login`, values);
      const userStored = result.data.token;
      await AsyncStorage.setItem("userInfo", userStored);
      result.status == 200 ? navigation.navigate("Home") : null;
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(true);
      console.log(err);
    }
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string("Ingresa tu email o nombre de usuario")
      .required("*Campo requerido"),

    password: yup
      .string("Ingresa tu Contraseña")
      // .min(8, "La contraseña debe tener al menos 8 caracteres")
      .required("*Campo requerido"),
  });

  return (
    <>
      {userString === null ? (
        <View style={welcome.container}>
          <View style={welcome.titleContainer}>
            <Text style={welcome.info}>Welcome to Match Maker</Text>
          </View>
          {
            //LOGIN FORMIK
          }
          <View style={welcome.loginContainer}>
            <Formik
              validateOnMount={true}
              validationSchema={validationSchema}
              initialValues={{ email: "", password: "" }}
              onSubmit={(values, { resetForm }) => {
                handleLogin(values, resetForm);
              }}
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
                  <View style={form.inputContainer}>
                    <TextInput
                      style={form.inputs}
                      placeholder="Email or Nickname"
                      name="email"
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      keyboardType="email-address"
                    />
                    {/* <View style={form.errorContainer}>
                      {errors.email && touched.email && (
                        <Text style={form.errorText}>{errors.email}</Text>
                      )}
                    </View> */}

                    <TextInput
                      style={form.inputs}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      secureTextEntry={true}
                      placeholder="Password"
                      name="password"
                    />
                    {/* <View style={form.errorContainer}>
                      {errors.password && touched.password && (
                        <Text style={form.errorText}>{errors.password}</Text>
                      )}
                    </View> */}

                    <TouchableOpacity
                      disable
                      style={form.colorBtn}
                      onPress={handleSubmit}
                    >
                      <Text style={form.colorTxtBtn}>LOGIN</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>

            {errorMessage ? (
              <Text
                style={{
                  color: "white",
                  fontSize: 18,
                  textAlign: "center",
                  backgroundColor: "red",
                  marginTop: 20,
                  borderRadius: 20,
                  width: "72%",
                  paddingVertical: 10,
                  alignSelf: "center",
                }}
              >
                E-mail or password invalid
              </Text>
            ) : null}
            <View style={form.registerOptContainer}>
              <Text style={form.colorTxtBtn}>Don't have an account yet?</Text>
              <Text
                style={form.registerTxtBtn}
                onPress={() => {
                  setErrorMessage(false);
                  navigation.navigate("Register");
                }}
              >
                Register!
              </Text>
            </View>
            {isLoading ? (
              <ActivityIndicator size="large" color="#00ff00" />
            ) : null}
          </View>
        </View>
      ) : (
        <View style={welcome.container}></View>
      )}
    </>
  );
}

export default Welcome;
