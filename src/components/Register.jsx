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
import axios from "axios";

import Constants from "expo-constants";

const { manifest } = Constants;

const uri = `http://${manifest.debuggerHost.split(':').shift()}:3000`;

function Register({ navigation }) {
  

    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
      });

      onChangeText = (key, val) => {
        setForm({...form, [key]: val })
      }

      const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`${uri}/api/user/register`, form)
        .then(res => {
          res.status == 201 ?  navigation.navigate('Login') : null
        })
        
      };

    return (
        <View>
          <Text>Registro</Text>
    
          <Text>Llene el siguente formulario para registrarse</Text>
    
          <SafeAreaView>
            <View>
              <TextInput
                 onChangeText={val => onChangeText('name', val)}
                type="text"
                placeholder="name"
                name="name"
              />
            </View>
    
            <View>
              <TextInput
               onChangeText={val => onChangeText('surname', val)}
                type="text"
                placeholder="surname"
                name="surname"
              />
            </View>
    
            <View>
              <TextInput
               onChangeText={val => onChangeText('email', val)}
                type="email"
                placeholder="Email"
                name="email"
              />
            </View>

            <View>
              <TextInput
                onChangeText={val => onChangeText('password', val)}
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