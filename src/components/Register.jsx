import React from "react";
import {
  Button,
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from "react-native";

import { useEffect, useState } from "react";

function Register({ navigation }) {

    const [form, setForm] = useState({
        user: "",
        email: "",
        password: "",
      });
    
      const handleChange = (e) => {
        e.preventDefault();
        setForm({ ...form, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        navigation.navigate('Login')
      };

    return (
        <View>
          <Text>Registro</Text>
    
          <Text>Llene el siguente formulario para registrarse</Text>
    
          <SafeAreaView>
            <View>
              <TextInput
                onChange={handleChange}
                type="text"
                placeholder="Usuario"
                name="user"
              />
            </View>
    
            <View>
              <TextInput
                onChange={handleChange}
                type="email"
                placeholder="Email"
                name="email"
              />
            </View>
    
            <View>
              <TextInput
                onChange={handleChange}
                type="password"
                placeholder="Password"
                name="password"
              />
            </View>
    
            <View>
              <Button type="submit" title="Registrarse" onPress={handleSubmit}/>
            </View>
          </SafeAreaView>
        </View>
      );
  }

export default Register